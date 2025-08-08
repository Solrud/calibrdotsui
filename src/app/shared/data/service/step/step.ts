import {inject, Injectable, signal} from '@angular/core';
import {StepValue} from '../../model/implementations/step-value';
import {ApiStep} from './api-step';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Step {

  private readonly apiStep = inject(ApiStep);

  private loadStepListSubscription: Subscription | null = null;

  readonly stepListStorage = signal<StepValue[] | null>(null);


  loadStepList(): void {
    if (this.loadStepListSubscription)
      this.loadStepListSubscription = null;

    this.loadStepListSubscription = this.apiStep.getAll$()
      .subscribe({
        next: stepList => {
          this.stepListStorage.set(stepList);

          this.loadStepListSubscription = null;
        }
      })
  }

  getStepList(): StepValue[] | null {
    return this.stepListStorage();
  }
}
