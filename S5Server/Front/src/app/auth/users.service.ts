import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SoldierDto } from '../../ServerService/soldier.service';
import { S5App_ErrorHandler } from '../shared/models/ErrorHandler';
import { LookupDto } from '../shared/models/lookup.models';

// ── Models ──────────────────────────────────────────────────

export interface UserListItem {
  id: string;
  userName: string;
  email: string | null;
  emailConfirmed: boolean;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  lastLoginDate: string | null;
  registrationDate: string;
  lockoutEnabled: boolean;
  lockoutEnd: string | null;
  isLocked: boolean;
  accessFailedCount: number;
  twoFactorEnabled: boolean;
  requirePasswordChange: boolean;
  lastPasswordChangeDate: string | null;
  soldier: SoldierDto | null;
  roles?: string[];
}

export interface CreateUserDto {
  soldierId: string;
  userName: string;
  password: string;
  email?: string;
  emailConfirmed?: boolean;
  roles?: string[];
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface ChangeUsernameDto {
  currentPassword: string;
  newUserName: string;
}

export interface SetLockoutDto {
  lock: boolean;
  lockoutEnd?: string | null;
}
/** DTO для адміністративного скидання пароля */
export interface AdminResetPasswordDto {
  newPassword: string;
  requirePasswordChange?: boolean;
}
/** DTO для адміністративної зміни логіну */
export interface AdminChangeUsernameDto {
  newUserName: string;
}
/*
export interface RoleDto {
  id: string;
  name: string;
  normalizedName: string;
}
*/
export interface CreateRoleDto {
  name: string;
}

// ── Validation ──────────────────────────────────────────────

export interface PasswordRequirements {
  requiredLength: number;
  requireDigit: boolean;
  requireLowercase: boolean;
  requireUppercase: boolean;
  requireNonAlphanumeric: boolean;
  requiredUniqueChars: number;
}

export interface ValidatePasswordResult {
  isValid: boolean;
  errors: string[];
}

export interface CheckNameResult {
  isAvailable: boolean;
  message: string;
}

// ── Service ─────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/account';

  // ── Users ───────────────────────────────

  /**
   * Отримати всіх користувачів
   * GET /api/account?includeInactive={includeInactive}
   */
  getAll(includeInactive = false): Observable<UserListItem[]> {
    let params = new HttpParams();
    if (includeInactive) {
      params = params.set('includeInactive', 'true');
    }
    return this.http.get<UserListItem[]>(this.baseUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати список користувачів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати користувача за ID
   * GET /api/account/{id}
   */
  getById(id: string): Observable<UserListItem> {
    return this.http.get<UserListItem>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати дані користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Отримати користувача за ID військовослужбовця
   * GET /api/account/by-soldier/{soldierId}
   */
  getBySoldierId(soldierId: string): Observable<{ id: string; userName: string; email: string }> {
    return this.http
      .get<{
        id: string;
        userName: string;
        email: string;
      }>(`${this.baseUrl}/by-soldier/${soldierId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = S5App_ErrorHandler.handleHttpError(
            error,
            'Не вдалося знайти користувача за військовослужбовцем',
          );
          return throwError(() => new Error(message));
        }),
      );
  }

  /**
   * Створити користувача
   * POST /api/account
   */
  create(dto: CreateUserDto): Observable<UserListItem> {
    return this.http.post<UserListItem>(this.baseUrl, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося створити користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Видалити користувача
   * DELETE /api/account/{id}
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося видалити користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Змінити пароль користувача
   * POST /api/account/{id}/change-password
   */
  changePassword(id: string, dto: ChangePasswordDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/change-password`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося змінити пароль користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Змінити ім'я користувача
   * POST /api/account/{id}/change-username
   */
  changeUsername(id: string, dto: ChangeUsernameDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/change-username`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося змінити логін користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Встановити блокування користувача
   * POST /api/account/{id}/lockout
   */
  setLockout(id: string, dto: SetLockoutDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/lockout`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося змінити стан блокування користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  // ── Admin ───────────────────────────────

  /**
   * [АДМІН] Скинути пароль користувача без знання поточного
   * POST /api/account/{id}/admin-reset-password
   */
  adminResetPassword(id: string, dto: AdminResetPasswordDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/admin-reset-password`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося скинути пароль користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * [АДМІН] Змінити ім'я користувача без знання пароля
   * POST /api/account/{id}/admin-change-username
   */
  adminChangeUsername(id: string, dto: AdminChangeUsernameDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/admin-change-username`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося змінити логін користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  // ── Roles ───────────────────────────────

  /**
   * Отримати всі ролі
   * GET /api/account/roles
   */
  getAllRoles(): Observable<LookupDto[]> {
    return this.http.get<LookupDto[]>(`${this.baseUrl}/roles`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати список ролей',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Створити роль
   * POST /api/account/roles
   */
  createRole(dto: CreateRoleDto): Observable<LookupDto> {
    return this.http.post<LookupDto>(`${this.baseUrl}/roles`, dto).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося створити роль');
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Додати роль користувачу
   * POST /api/account/{userId}/roles/{roleName}
   */
  addUserToRole(userId: string, roleName: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${userId}/roles/${roleName}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося додати роль користувачу',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Видалити роль у користувача
   * DELETE /api/account/{userId}/roles/{roleName}
   */
  removeUserFromRole(userId: string, roleName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}/roles/${roleName}`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося видалити роль у користувача',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  // ── Validation ──────────────────────────

  /**
   * Отримати вимоги до пароля
   * GET /api/account/password-requirements
   */
  getPasswordRequirements(): Observable<PasswordRequirements> {
    return this.http.get<PasswordRequirements>(`${this.baseUrl}/password-requirements`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати вимоги до пароля',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Перевірити пароль на відповідність вимогам
   * POST /api/account/validate-password
   */
  validatePassword(
    password: string,
    userName?: string,
    email?: string,
  ): Observable<ValidatePasswordResult> {
    return this.http
      .post<ValidatePasswordResult>(`${this.baseUrl}/validate-password`, {
        password,
        userName: userName ?? '',
        email,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося перевірити пароль');
          return throwError(() => new Error(message));
        }),
      );
  }

  /**
   * Перевірити доступність імені користувача
   * POST /api/account/check-username
   */
  checkUsername(userName: string, excludeUserId?: string): Observable<CheckNameResult> {
    return this.http
      .post<CheckNameResult>(`${this.baseUrl}/check-username`, {
        userName,
        excludeUserId,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = S5App_ErrorHandler.handleHttpError(
            error,
            "Не вдалося перевірити ім'я користувача",
          );
          return throwError(() => new Error(message));
        }),
      );
  }

  /**
   * Перевірити доступність email
   * POST /api/account/check-email
   */
  checkEmail(email: string, excludeUserId?: string): Observable<CheckNameResult> {
    return this.http
      .post<CheckNameResult>(`${this.baseUrl}/check-email`, {
        email,
        excludeUserId,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const message = S5App_ErrorHandler.handleHttpError(error, 'Не вдалося перевірити email');
          return throwError(() => new Error(message));
        }),
      );
  }
}
