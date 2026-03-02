import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
  APP_INITIALIZER,
  inject,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { firstValueFrom } from 'rxjs';
import { authInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';

import { routes } from './app.routes';

// Описываем формат, который поймет даже стандартный NativeAdapter для отображения
export const MY_NATIVE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'PP',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: 'uk-UA' },
    { provide: MAT_DATE_FORMATS, useValue: MY_NATIVE_FORMATS },
    provideNativeDateAdapter(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        const auth = inject(AuthService);
        return () => firstValueFrom(auth.checkSession());
      },
      multi: true,
    },
  ],
};
