import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  //! Показывать/Скрыть спиннер
  private spinnerVisibility$ = new BehaviorSubject(false);
  showSpinner$(): void {
    this.spinnerVisibility$.next(true);
  }
  hideSpinner(): void {
    this.spinnerVisibility$.next(false);
  }
  getSpinnerStatus() {
    return this.spinnerVisibility$.asObservable();
  }
}
