import {InjectionToken} from '@angular/core';
import {environment} from '../../../../environments/environment';


export const AUTH_URL_TOKEN = new InjectionToken<string>('url auth', {
  providedIn: 'root',
  factory: () => environment.backendURL + '/auth'
})

export const LOGIN_URL_TOKEN = new InjectionToken<string>('url login', {
  providedIn: 'root',
  factory: () => environment.loginUrl
})
