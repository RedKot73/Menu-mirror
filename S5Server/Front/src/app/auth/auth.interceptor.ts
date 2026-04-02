import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * HTTP interceptor:
 * 1. Додає withCredentials: true до кожного запиту (для cookie-auth)
 * 2. При отриманні 401 — скидає user і редіректить на /login
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const token = auth.token();

  let authReq = req.clone({ withCredentials: true });

  if (token) {
    authReq = authReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // Don't redirect on login/logout failures to show error messages
      const isAuthExempt = req.url.includes('/api/account/login') || req.url.includes('/graphql');

      if (error.status === 401 && !isAuthExempt) {
        auth.logout();
      }
      return throwError(() => error);
    }),
  );
};

