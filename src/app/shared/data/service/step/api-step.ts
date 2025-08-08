import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ISearch} from '../isearch';
import {StepValue} from '../../model/implementations/step-value';
import {Observable, of} from 'rxjs';
import {ABase} from '../abase';
import {STEP_TOKEN} from '../../url/url-list.token';

@Injectable({
  providedIn: 'root'
})
export class ApiStep extends ABase implements ISearch<StepValue>{

  constructor(@Inject(STEP_TOKEN) url: string ) {
    super(url);
  }

  getAll$(): Observable<StepValue[]> {
    // return this.httpClient
    //   .get<StepValue[]>(this.url);

    return of([
      new StepValue('3 ступень', 225.2),
      new StepValue('4 ступень', 231),
      new StepValue('5 ступень', 234),
      new StepValue('6 ступень', 233.7),
      new StepValue('7 ступень', 233.7),
      new StepValue('8 ступень', 233.7),
    ])
  }
}
