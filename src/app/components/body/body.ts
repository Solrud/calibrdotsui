import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {Calculate} from '../calculate/calculate';
import {AllCalculatedData} from '../../shared/data/model/implementations/for-xlsx/all-calculated-data';

@Component({
  selector: 'app-body',
  imports: [
    Calculate
  ],
  templateUrl: './body.html',
  styleUrl: './body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: "main-bg w-100 h-100"}
})
export class Body {

  readonly allData = signal<AllCalculatedData | null>(null);

  onGetAllData(allData: AllCalculatedData | null): void {
    this.allData.set(allData)
    console.log(allData)
  }
}
