import {IBase} from '../IBase';
import {StepValue} from './step-value';

export class DataForCalc implements IBase{
  stepValue: StepValue | null = null;
  widthOfBladeSlot: number = 0;
  minWidthOfBladeShank: number = 0;
  maxWidthOfBladeShank: number = 0;
  maxHeightOfWorkingBladeAtLeadingEdge: number = 0;
  minHeightOfWorkingBladeAtLeadingEdge: number = 0;
  maxHeightOfWorkingBladeAtTrailingEdge: number = 0;
  minHeightOfWorkingBladeAtTrailingEdge: number = 0;
  a: number = 22.5;
}

// для справки:
// ширина лопаточного паза диска - widthOfBladeSlot
// наименьшая ширина хвостовика лопатки - minWidthOfBladeShank
// наибольшая ширина хвостовика лопатки - maxWidthOfBladeShank
// наибольшая высота рабочей лопатки по входной кромке - maxHeightOfWorkingBladeAtLeadingEdge
// наименьшая высота рабочей лопатки по входной кромке - minHeightOfWorkingBladeAtLeadingEdge
// наибольшая высота рабочей лопатки по выходной кромке - maxHeightOfWorkingBladeAtTrailingEdge
// наименьшая высота рабочей лопатки по выходной кромке - minHeightOfWorkingBladeAtTrailingEdge
