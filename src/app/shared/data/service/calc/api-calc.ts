import {Inject, Injectable} from '@angular/core';
import {ABase} from '../abase';
import {DATA_FOR_CALC_TOKEN} from '../../url/url-list.token';
import {DataForCalc} from '../../model/implementations/data-for-calc';
import {Observable, of} from 'rxjs';
import {CalibrationPointRadius} from '../../model/implementations/calibration-point-radius';

@Injectable({
  providedIn: 'root'
})
export class ApiCalc extends ABase{

  constructor(@Inject(DATA_FOR_CALC_TOKEN) url: string) {
    super(url);
  }

  calculate$(dataForCalc: DataForCalc): Observable<CalibrationPointRadius[]> {
    // return this.httpClient
    //   .post<CalibrationPointRadius[]>(this.url, dataForCalc);

    function hCalc(widthOfBladeShank: number): number{
      const aRadian = dataForCalc.a * Math.PI / 180;
      return ( (dataForCalc.widthOfBladeSlot - widthOfBladeShank) / 2 ) * (1 / Math.tan(aRadian));
    }

    const h1 = hCalc(dataForCalc.minWidthOfBladeShank);
    const h2 = hCalc(dataForCalc.maxWidthOfBladeShank);

    const rMaxIn: number = Number(dataForCalc.stepValue) + h1 + dataForCalc.maxHeightOfWorkingBladeAtLeadingEdge;
    const rMinIn: number = Number(dataForCalc.stepValue) + h2 + dataForCalc.minHeightOfWorkingBladeAtLeadingEdge;
    const rMaxOut: number = Number(dataForCalc.stepValue) + h1 + dataForCalc.maxHeightOfWorkingBladeAtTrailingEdge;
    const rMinOut: number = Number(dataForCalc.stepValue) + h2 + dataForCalc.minHeightOfWorkingBladeAtTrailingEdge;

    const radiusCalibrPointsList = [
      new CalibrationPointRadius('rMaxIn', Number(rMaxIn.toFixed(3))),
      new CalibrationPointRadius('rMinIn', Number(rMinIn.toFixed(3))),
      new CalibrationPointRadius('rMaxOut', Number(rMaxOut.toFixed(3))),
      new CalibrationPointRadius('rMinOut', Number(rMinOut.toFixed(3))),
    ]

    return of(radiusCalibrPointsList);
  }
}
