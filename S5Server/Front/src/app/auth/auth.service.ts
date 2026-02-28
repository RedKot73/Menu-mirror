import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { AuthUser, LoginDto } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = '/api/account';
  private http = inject(HttpClient);
  private router = inject(Router);

  /** Поточний користувач (null = не авторизований) */
  readonly user = signal<AuthUser | null>(null);

  /** Чи авторизований користувач */
  readonly isAuthenticated = computed(() => this.user() !== null);

  /** Ролі поточного користувача */
  readonly roles = computed(() => this.user()?.roles ?? []);

  /** ПІБ для відображення */
  readonly displayName = computed(() => {
    const u = this.user();
    if (!u?.soldier) {
      return u?.userName ?? '';
    }
    const s = u.soldier;
    return [s.rank, s.lastName, s.firstName].filter(Boolean).join(' ');
  });

  /** Вхід в систему */
  login(dto: LoginDto): Observable<AuthUser> {
    return this.http
      .post<AuthUser>(`${this.api}/login`, dto)
      .pipe(tap((user) => this.user.set(user)));
  }

  /** Вихід з системи */
  logout(): Observable<void> {
    return this.http.post<void>(`${this.api}/logout`, {}).pipe(
      tap(() => {
        this.user.set(null);
        this.router.navigate(['/login']);
      }),
    );
  }

  /** Перевірити поточну сесію (cookie) — викликається при старті додатку */
  checkSession(): Observable<AuthUser | null> {
    return this.http.get<AuthUser>(`${this.api}/me`).pipe(
      tap((user) => this.user.set(user)),
      catchError(() => {
        this.user.set(null);
        return of(null);
      }),
    );
  }

  /** Чи має користувач хоча б одну з вказаних ролей */
  hasRole(...roles: string[]): boolean {
    const userRoles = this.roles();
    return roles.some((r) => userRoles.includes(r));
  }
}
