import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { appConfig } from './app/app.config';
import { App } from './app/app';

registerLocaleData(localeUk);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
