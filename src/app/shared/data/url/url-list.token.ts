import {InjectionToken} from '@angular/core';
import {environment} from '../../../../environments/environment';

export const STEP_TOKEN = new InjectionToken<string>('Step url', {
  providedIn: 'root',
  factory: (): string => environment.backendURL + '/step'
});

export const DATA_FOR_CALC_TOKEN = new InjectionToken<string>('data for calc url', {
  providedIn: 'root',
  factory: (): string => environment.backendURL + '/calc'
});
