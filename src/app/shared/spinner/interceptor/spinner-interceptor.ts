import { HttpInterceptorFn } from '@angular/common/http';
import {Event} from '../../event/event';
import {inject} from '@angular/core';
import {finalize} from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  let activeRequestCount: number = 0;
  const eventService = inject(Event);

  if (activeRequestCount === 0)
    eventService.showSpinner$();

  activeRequestCount++;

  return next(req)
    .pipe(
      finalize(() => {
        activeRequestCount--;
        if(activeRequestCount === 0)
          eventService.hideSpinner();
      }));
};
