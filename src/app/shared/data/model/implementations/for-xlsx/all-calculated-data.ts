import {CalibrationPointRadius} from '../calibration-point-radius';
import {DataForCalc} from '../data-for-calc';

export class AllCalculatedData {
  calibrationPointsRadiusList: CalibrationPointRadius[] | null = null;
  dataForCalc: DataForCalc | null = null;

  constructor(calibrationPointsRadiusList: CalibrationPointRadius[], dataForCalc: DataForCalc) {
    this.calibrationPointsRadiusList = calibrationPointsRadiusList;
    this.dataForCalc = dataForCalc;
  }
}
