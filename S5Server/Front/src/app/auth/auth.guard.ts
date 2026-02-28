import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard: дозволяє доступ тільки авторизованим користувачам.
 * Якщо користувач не авторизований — редірект на /login.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

/**
 * Guard: дозволяє доступ тільки користувачам із зазначеними ролями.
 * Використання в routes: canActivate: [roleGuard('Admin', 'Commander')]
 */
export function roleGuard(...allowedRoles: string[]): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated()) {
      return router.createUrlTree(['/login']);
    }

    if (auth.hasRole(...allowedRoles)) {
      return true;
    }

    // Авторизований, але немає потрібної ролі
    return router.createUrlTree(['/']);
  };
}
