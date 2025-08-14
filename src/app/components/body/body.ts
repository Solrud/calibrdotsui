import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Calculate} from '../calculate/calculate';
import {AllCalculatedData} from '../../shared/data/model/implementations/for-xlsx/all-calculated-data';
import {CalibrationPointRadius} from '../../shared/data/model/implementations/calibration-point-radius';
import {Excel} from '../../shared/excel/excel';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-body',
  imports: [
    Calculate,
    TranslatePipe
  ],
  templateUrl: './body.html',
  styleUrl: './body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: "main-bg w-100 h-100"}
})
export class Body {

  readonly allData = signal<AllCalculatedData | null>(null);
  private readonly excel = inject(Excel);

  onGetAllData(allData: AllCalculatedData | null): void {
    this.allData.set(allData)
  }

  getValueRadiusFromList(index: number): CalibrationPointRadius['value'] {
    // @ts-ignore
    return this.allData()?.calibrationPointsRadiusList[index]?.value;
  }

  onClickExportExcelResults(): void {
    this.excel.onExportCalibrationPointRadiusResults(this.allData());
  }
}
