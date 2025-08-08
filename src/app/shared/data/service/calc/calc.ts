import {inject, Injectable} from '@angular/core';
import {ApiCalc} from './api-calc';
import {DataForCalc} from '../../model/implementations/data-for-calc';
import {Observable} from 'rxjs';
import {CalibrationPointRadius} from '../../model/implementations/calibration-point-radius';

@Injectable({
  providedIn: 'root'
})
export class Calc {
  private readonly apiCalc = inject(ApiCalc);

  calc$(dataForCalc: DataForCalc): Observable<CalibrationPointRadius[]> {
    return this.apiCalc.calculate$(dataForCalc);
  }
}
