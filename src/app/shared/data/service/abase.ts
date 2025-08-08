import {inject, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export abstract class ABase {
  protected url: string;
  protected httpClient = inject(HttpClient);

  protected constructor(url: string) {
    this.url = url;
  }
}
