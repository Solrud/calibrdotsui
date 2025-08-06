import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {MissingTranslationHandler, provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {httpLoaderFactory, ReMissingTranslationHandler} from './shared/translate/translate-config';
import {authInterceptor} from './shared/auth/interceptor/auth-interceptor';
import {spinnerInterceptor} from './shared/spinner/interceptor/spinner-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideTranslateService({
      useDefaultLang: environment.production,
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: ReMissingTranslationHandler
      }
    }),
    provideHttpClient(
      withInterceptors([authInterceptor, spinnerInterceptor])
    )
  ]
};
