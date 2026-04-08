import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Guard: дозволяє доступ тільки повністю авторизованим користувачам.
 * - Якщо очікується 2FA верифікація → редірект на /welcome.
 * - Якщо не авторизований → редірект на /login.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.requiresTwoFactor() || auth.isNeeds2FASetup()) {
    return router.createUrlTree(['/welcome']);
  }

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

/**
 * Guard: дозволяє доступ до /welcome тільки якщо є незавершена 2FA.
 * Якщо користувач відкриє /welcome напряму без логіну — редірект на /login.
 */
export const twoFactorGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.requiresTwoFactor() || auth.isNeeds2FASetup()) {
    return true;
  }

  // Немає стану очікування 2FA — відправляємо на логін
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

    if (auth.requiresTwoFactor() || auth.isNeeds2FASetup()) {
      return router.createUrlTree(['/welcome']);
    }

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
