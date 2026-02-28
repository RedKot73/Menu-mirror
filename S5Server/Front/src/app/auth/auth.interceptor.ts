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

  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('/api/account/login')) {
        auth.user.set(null);
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
