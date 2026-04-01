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

  /** Чи авторизований користувач повністю */
  readonly isAuthenticated = computed(() => this.user() !== null && !this.requiresTwoFactor());

  /** Чи очікує користувач на 2FA верифікацію */
  readonly requiresTwoFactor = computed(() => this.pendingTwoFactor() !== null);

  /** Ролі поточного користувача */
  readonly roles = computed(() => this.user()?.roles ?? []);

  constructor() {
    // Автоматичне збереження токену в localStorage
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      this.token.set(savedToken);
    }
  }

  /** Крок 1: Вхід за логіном/паролем (через GraphQL Mutation) */
  login(dto: LoginDto): Observable<AuthPayload> {
    const query = `
      mutation Login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
          token
          requiresTwoFactor
          userId
          user {
            id
            userName
            email
            roles
            soldier {
              id
              firstName
              lastName
              rankShortValue
            }
          }
        }
      }
    `;

    return this.http
      .post<GqlResponse<{ login: AuthPayload }>>(this.gql, {
        query,
        variables: { userName: dto.userName, password: dto.password },
      })
      .pipe(
        map((res) => {
          if (!res.data?.login) {
            throw new Error('Authentication failed');
          }
          return res.data.login;
        }),
        tap((payload) => {
          if (payload.token) {
            this.setToken(payload.token);
          }
          if (payload.requiresTwoFactor) {
            this.pendingTwoFactor.set({ userId: payload.userId! });
          } else if (payload.user) {
            this.user.set(payload.user);
            this.pendingTwoFactor.set(null);
          }
        }),
      );
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
            roles
            soldier {
              id
              firstName
              lastName
              rankShortValue
            }
          }
        }
      }
    `;

    return this.http
      .post<GqlResponse<{ verifyTwoFactor: AuthPayload }>>(this.gql, {
        query,
        variables: { code },
      })
      .pipe(
        map((res) => {
          if (!res.data?.verifyTwoFactor) {
             // Return an empty payload if structural error but not 401
             return { token: null, requiresTwoFactor: false, userId: null, user: null };
          }
          return res.data.verifyTwoFactor;
        }),
        tap((payload) => {
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
  }

  /** ПІБ для відображення */
  readonly displayName = computed(() => {
    const u = this.user();
    if (!u?.soldier) {
      return u?.userName ?? '';
    }
    const s = u.soldier as any;
    return [s.rankShortValue, s.firstName, s.lastName].filter(Boolean).join(' ');
  });

  /** Вихід з системи */
  logout(): Observable<void> {
    localStorage.removeItem('auth_token');
    this.token.set(null);
    this.user.set(null);
    this.pendingTwoFactor.set(null);
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

    // Для перевірки сесії JWT використовуємо /api/account/me або GraphQL запит Query.GetCurrentUser
    return this.http.get<AuthUser>(`${this.api}/me`).pipe(
      tap((user) => this.user.set(user)),
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

