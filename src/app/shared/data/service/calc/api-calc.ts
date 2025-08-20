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
      const aRadian = dataForCalc.a * Math.PI / 180; // ? 2.414213562373095 В РАДИАНЫ
      // const aRadian = dataForCalc.a;                      // ? 0.07121930009000542 В ГРАДУСАХ
      return ( (dataForCalc.widthOfBladeSlot - widthOfBladeShank) / 2 ) * (1 / Math.tan(aRadian));
    }

    const h1: number = hCalc(dataForCalc.minWidthOfBladeShank);
    const h2: number = hCalc(dataForCalc.maxWidthOfBladeShank);

    const rMaxIn: number = Number(dataForCalc.stepValue?.value) + h1 + dataForCalc.maxHeightOfWorkingBladeAtLeadingEdge;
    const rMinIn: number = Number(dataForCalc.stepValue?.value) + h2 + dataForCalc.minHeightOfWorkingBladeAtLeadingEdge;

    const radiusCalibrPointsList = [
      new CalibrationPointRadius('rMaxIn', Number(rMaxIn.toFixed(3))),
      new CalibrationPointRadius('rMinIn', Number(rMinIn.toFixed(3))),
    ]

    let rMaxOut;
    let rMinOut;
    if (dataForCalc.stepValue?.name !== "8 ступень"){
      rMaxOut = Number(dataForCalc.stepValue?.value) + h1 + dataForCalc.maxHeightOfWorkingBladeAtTrailingEdge;
      rMinOut = Number(dataForCalc.stepValue?.value) + h2 + dataForCalc.minHeightOfWorkingBladeAtTrailingEdge;

      radiusCalibrPointsList.push(
        new CalibrationPointRadius('rMaxOut', Number(rMaxOut.toFixed(3))),
        new CalibrationPointRadius('rMinOut', Number(rMinOut.toFixed(3))))
    }

    return of(radiusCalibrPointsList);
  }
}
