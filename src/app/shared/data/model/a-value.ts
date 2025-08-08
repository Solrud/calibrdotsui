import {ABase} from './abase';

export abstract class AValue extends ABase{
  name: string | null = null;
  value: number | null = null;
  // unitMeasurement: string | null = null;

  protected constructor(name: string, result: number) {
    super();
    this.name = name;
    this.value = result;
    // this.unitMeasurement = unitMeasurement;
  }
}
