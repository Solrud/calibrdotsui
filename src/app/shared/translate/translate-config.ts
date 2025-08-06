import {HttpClient} from '@angular/common/http';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  Translation
} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Observable} from 'rxjs';

export const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, 'public/i18n/', '.json');


export class ReMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): Translation | Observable<Translation> {
    alert(`Внимание!: перевод для ${params.key} на языке ${params.translateService.currentLang} отсутствует...`);
    return params.key;
  }
}
