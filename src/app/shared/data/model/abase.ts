import {IBase} from './IBase';

export abstract class ABase implements IBase{
  id: number = Math.random();
}
