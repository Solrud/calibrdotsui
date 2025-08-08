import {Observable} from 'rxjs';
import {IBase} from '../model/IBase';

export interface ISearch<D extends IBase> {
  getAll$(): Observable<D[]>;
}
