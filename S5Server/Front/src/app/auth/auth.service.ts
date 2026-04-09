import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { AuthUser, LoginDto, AuthPayload, GqlResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = '/api/account';
  private readonly gql = '/graphql';
  private http = inject(HttpClient);
  private router = inject(Router);

  /** Поточний авторизований користувач */
  readonly user = signal<AuthUser | null>(null);

  /** Поточний JWT токен */
  readonly token = signal<string | null>(localStorage.getItem('auth_token'));

  /** Стан очікування 2FA (зберігаємо UserId) */
  readonly pendingTwoFactor = signal<{ userId: string } | null>(null);

  /** Стан очікування налаштування 2FA (зберігаємо UserId) */
  readonly needs2FASetup = signal<{ userId: string } | null>(null);

  /** Режим 2FA (soft/strict) витягнутий з токену */
  readonly twoFactorMode = signal<'soft' | 'strict'>('strict');

  /** Чи авторизований користувач повністю */
  readonly isAuthenticated = computed(() => this.user() !== null && !this.requiresTwoFactor() && !this.isNeeds2FASetup());

  /** Чи очікує користувач на 2FA верифікацію */
  readonly requiresTwoFactor = computed(() => this.pendingTwoFactor() !== null);

  /** Чи очікує користувач на обов'язкове налаштування 2FA */
  readonly isNeeds2FASetup = computed(() => this.needs2FASetup() !== null);

  /** Ролі поточного користувача */
  readonly roles = computed(() => this.user()?.roles ?? []);

  constructor() {
    // Log 2FA security policy
    const token = this.token();
    let mandatory = false;
    let mode = 'strict';
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        mandatory = payload.needs2FASetup === 'true' || payload.needs2FASetup === true;
        mode = payload.twoFactorMode ?? 'strict';
      } catch { }
    }
    console.log(
      '%c[DEBUG] 2FA SECURITY POLICY:',
      'color: #ff9900; font-weight: bold;',
      { REQUIRE_MANDATORY_2FA: mandatory, TWO_FACTOR_MODE: mode }
    );

    // Автоматичне збереження токену в localStorage
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      this.token.set(savedToken);
      this.trySetPendingFromToken(savedToken);
    }
  }

  private trySetPendingFromToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.requiresTwoFactor === 'true' || payload.requiresTwoFactor === true) {
        this.pendingTwoFactor.set({ userId: payload.sub });
        this.twoFactorMode.set(payload.twoFactorMode === 'soft' ? 'soft' : 'strict');
      }
    } catch {
      // Ignore parse errors
    }
  }

  /** Крок 1: Вхід за логіном/паролем (через GraphQL Mutation) */
  login(dto: LoginDto): Observable<AuthPayload> {
    const query = `
      mutation Login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
          token
          requiresTwoFactor
          needs2FASetup
          userId
          user {
            id
            userName
            email
            lastLoginDate
            requirePasswordChange
            lastPasswordChangeDate
            roles
            soldier {
              id
              firstName
              lastName
              midleName
              unitId
              rankId
            }
          }
        }
      }
    `.trim();

    return this.http
      .post<GqlResponse<{ login: AuthPayload }>>(this.gql, {
        query,
        variables: { userName: dto.userName, password: dto.password },
      })
      .pipe(
        map((res: GqlResponse<{ login: AuthPayload }>) => {
          if (!res.data?.login) {
            throw new Error('Authentication failed');
          }
          return res.data.login;
        }),
        tap((payload: AuthPayload) => {
          if (payload.token) {
            this.setToken(payload.token);
          }
          if (payload.needs2FASetup) {
            this.needs2FASetup.set({ userId: payload.userId! });
            this.pendingTwoFactor.set(null);
          } else if (payload.requiresTwoFactor) {
            this.pendingTwoFactor.set({ userId: payload.userId! });
            this.needs2FASetup.set(null);
          } else if (payload.user) {
            this.user.set(payload.user);
            this.pendingTwoFactor.set(null);
            this.needs2FASetup.set(null);
          }
        }),
      );
  }

  /**
   * Перехід з режиму налаштування в режим верифікації без логауту.
   * Викликається після успішної мутації EnableTwoFactor.
   */
  transitionToVerification(): void {
    const userId = this.needs2FASetup()?.userId;
    if (userId) {
      console.log('[DEBUG] 2FA Enabled successfully. Transitioning to Step 2 without logout.');
      this.pendingTwoFactor.set({ userId });
      this.needs2FASetup.set(null);
    }
  }

  /** Крок 2: Підтвердження TOTP-коду (через GraphQL Mutation) */
  verifyTwoFactor(code: string): Observable<AuthPayload> {
    const query = `
      mutation Verify($code: String!) {
        verifyTwoFactor(code: $code) {
          token
          requiresTwoFactor
          userId
          user {
            id
            userName
            email
            lastLoginDate
            requirePasswordChange
            lastPasswordChangeDate
            roles
            soldier {
              id
              firstName
              lastName
              midleName
              unitId
              rankId
            }
          }
        }
      }
    `.trim();

    return this.http
      .post<GqlResponse<{ verifyTwoFactor: AuthPayload }>>(this.gql, {
        query,
        variables: { code },
      })
      .pipe(
        map((res: GqlResponse<{ verifyTwoFactor: AuthPayload }>) => {
          if (!res.data?.verifyTwoFactor) {
            // Return an empty payload if structural error but not 401
            return { token: null, requiresTwoFactor: false, userId: null, user: null } as AuthPayload;
          }
          return res.data.verifyTwoFactor;
        }),
        tap((payload: AuthPayload) => {
          if (payload.token && !payload.requiresTwoFactor) {
            this.setToken(payload.token);
            this.user.set(payload.user);
            this.pendingTwoFactor.set(null);
          }
        }),
      );
  }


  private setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('auth_token', token);
    this.trySetPendingFromToken(token);
  }

  /** ПІБ для відображення */
  readonly displayName = computed(() => {
    const u = this.user();
    if (!u?.soldier) {
      return "Системний (без прив'язки)";
    }
    const s = u.soldier as any;
    const rank = s.rankShortValue ? s.rankShortValue + ' ' : '';
    return `${rank}${s.lastName} ${s.firstName} ${s.midleName || ''}`.trim();
  });

  /** Вихід з системи */
  logout(): Observable<void> {
    localStorage.removeItem('auth_token');
    this.token.set(null);
    this.user.set(null);
    this.pendingTwoFactor.set(null);
    this.needs2FASetup.set(null);
    this.router.navigate(['/login']);
    return of(undefined);
  }

  /** Перевірити поточну сесію */
  checkSession(): Observable<AuthUser | null> {
    const token = this.token();
    if (!token) {
      this.user.set(null);
      return of(null);
    }

    // Primary guard: parse the raw JWT synchronously to detect an interim (2FA pending) token.
    // This mirrors the logic in trySetPendingFromToken() and is signal-independent,
    // preventing a race condition where APP_INITIALIZER calls checkSession() before
    // the pendingTwoFactor signal has propagated, which would cause /me to be called
    // with an interim token → 401 → unintended logout().
    try {
      const jwtPayload = JSON.parse(atob(token.split('.')[1]));
      if (jwtPayload['requiresTwoFactor'] === 'true' || jwtPayload['requiresTwoFactor'] === true) {
        return of(null);
      }
    } catch {
      // Malformed token — fall through to signal check
    }

    // Secondary guard: also check the signal state (covers edge cases where token was
    // already parsed and pendingTwoFactor signal is in sync).
    if (this.requiresTwoFactor() || this.isNeeds2FASetup()) {
      return of(null);
    }

    // Для перевірки сесії JWT використовуємо /api/account/me або GraphQL запит Query.GetCurrentUser
    return this.http.get<AuthUser>(`${this.api}/me`).pipe(
      tap((user: AuthUser) => this.user.set(user)),
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }

  /** Чи має користувач роль */
  hasRole(...roles: string[]): boolean {
    const userRoles = this.roles();
    return roles.some((r) => userRoles.includes(r));
  }
}

