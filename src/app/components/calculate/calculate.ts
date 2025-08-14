import {ChangeDetectionStrategy, Component, inject, OnInit, output} from '@angular/core';
import {ToastS} from '../../shared/toast/service/toast-s.service';
import {Step} from '../../shared/data/service/step/step';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {StepValue} from '../../shared/data/model/implementations/step-value';
import {DataForCalc} from '../../shared/data/model/implementations/data-for-calc';
import {Calc} from '../../shared/data/service/calc/calc';
import {ToastTextC} from '../../shared/toast/config/toast.class';
import {AllCalculatedData} from '../../shared/data/model/implementations/for-xlsx/all-calculated-data';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-calculate',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './calculate.html',
  styleUrl: './calculate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Calculate implements OnInit{
  private readonly toast = inject(ToastS);
  private readonly step = inject(Step);
  private readonly calc = inject(Calc);

  fgCalc: FormGroup | null = null;
  selectedStepValue: number = 0;
  newDataForCalc: DataForCalc | null = null

  readonly allDataForView = output<AllCalculatedData | null>();

  ngOnInit() {
    this._loadDefaultData();

    this.initFgCalc();
    this._observeFcStep();
    this._observeFgValidStatus();
  }

  _loadDefaultData(): void {
    this.step.loadStepList(); // Загрузка списка ступеней
  }

  getStepValueList(): StepValue[] | null {
    return this.step.getStepList(); // Выдача списка ступеней из storage
  }

  initFgCalc(): void {
    this.fgCalc = new FormGroup({
      step: new FormControl({value: null, disabled: false}, Validators.required),                                   //! ступень
      widthOfBladeSlot: new FormControl({value: 15.1, disabled: false}, Validators.required),                       //! ширина лопаточного паза диска
      minWidthOfBladeShank: new FormControl({value: 15.041, disabled: false}, Validators.required),                 //! наименьшая ширина хвостовика лопатки
      maxWidthOfBladeShank: new FormControl({value: 15.084, disabled: false}, Validators.required),                 //! наибольшая ширина хвостовика лопатки
      maxHeightOfWorkingBladeAtLeadingEdge: new FormControl({value: 45.23, disabled: false}, Validators.required),  //! наибольшая высота рабочей лопатки по входной кромке
      minHeightOfWorkingBladeAtLeadingEdge: new FormControl({value: 45.17, disabled: false}, Validators.required),  //! наименьшая высота рабочей лопатки по входной кромке
      maxHeightOfWorkingBladeAtTrailingEdge: new FormControl({value: 44.19, disabled: false}, Validators.required), //! наибольшая высота рабочей лопатки по выходной кромке
      minHeightOfWorkingBladeAtTrailingEdge: new FormControl({value: 44.13, disabled: false}, Validators.required), //! наименьшая высота рабочей лопатки по выходной кромке
    });
  }

  _observeFcStep(): void {
    this.fgCalc?.get('step')?.valueChanges
      .subscribe({
        next: (value)=> {
          this.toClearAllData();
          this.selectedStepValue = value;
        }
      });
  }

  _observeFgValidStatus(): void {
    this.fgCalc?.statusChanges.subscribe({
      next: status => {
        if (status === 'INVALID') this.toClearAllData();
      }
    })
  }

  // Получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this?.fgCalc?.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  fcClear(fcName: string): void {
    this.fgCalc?.get(fcName)?.setValue(null);
  }

  toClearAllData(): void {
    this.selectedStepValue = 0;
    this.newDataForCalc = null;
    this.allDataForView.emit(null);
  }

  createNewDataForCalc(): void {
    this.newDataForCalc = new DataForCalc();
    this.newDataForCalc.stepValue = this.selectedStepValue;
    this.newDataForCalc.widthOfBladeSlot = this.fgCalc?.get('widthOfBladeSlot')?.value;
    this.newDataForCalc.minWidthOfBladeShank = this.fgCalc?.get('minWidthOfBladeShank')?.value;
    this.newDataForCalc.maxWidthOfBladeShank = this.fgCalc?.get('maxWidthOfBladeShank')?.value;
    this.newDataForCalc.maxHeightOfWorkingBladeAtLeadingEdge = this.fgCalc?.get('maxHeightOfWorkingBladeAtLeadingEdge')?.value;
    this.newDataForCalc.minHeightOfWorkingBladeAtLeadingEdge = this.fgCalc?.get('minHeightOfWorkingBladeAtLeadingEdge')?.value;
    this.newDataForCalc.maxHeightOfWorkingBladeAtTrailingEdge = this.fgCalc?.get('maxHeightOfWorkingBladeAtTrailingEdge')?.value;
    this.newDataForCalc.minHeightOfWorkingBladeAtTrailingEdge = this.fgCalc?.get('minHeightOfWorkingBladeAtTrailingEdge')?.value;

  }

  onClickCalc(): void {
    if (!this.fgCalc?.invalid){
      this.createNewDataForCalc();

      if (this.newDataForCalc)
        this.calc.calc$(this.newDataForCalc).subscribe({
          next: result => {
            if (this.newDataForCalc && result && result.length > 0){
              let outData = new AllCalculatedData(result, this.newDataForCalc);

              this.allDataForView.emit(outData);
              this.toast.showPositive(new ToastTextC('Успешно вычислено!'));
            } else {
              this.toast.showNegative(new ToastTextC('Случилась непредвиденная ошибка!'));
            }
          },
          error: error => {
            this.toast.showNegative(new ToastTextC(error.mesage));
          }
        });
    }
  }
}
