import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {finalize} from 'rxjs';
import {SpinnerService} from '../service/spinner-service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  let activeRequestCount: number = 0;
  const spinnerService = inject(SpinnerService);

  if (activeRequestCount === 0)
    spinnerService.showSpinner$();

  activeRequestCount++;

  return next(req)
    .pipe(
      finalize(() => {
        activeRequestCount--;
        if(activeRequestCount === 0)
          spinnerService.hideSpinner();
      }));
};
