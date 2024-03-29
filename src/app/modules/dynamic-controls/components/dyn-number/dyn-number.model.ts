import { BaseControl } from '../base/base.model';

export class DynNumber extends BaseControl {
  type = 'number'
  placeholder?: string;
  step?: number;

  private _settings = [
    { controlId: 'min', label: 'Minimum value', type: 'number' },
    { controlId: 'max', label: 'Maximum value', type: 'number' },
  ]


  constructor(options: {} = {}) {
    super(options);
    this.settings = this.settings.concat(this._settings);

    this.controlId = this.controlId || this.createControlId(this.type);
    this.placeholder = options['placeholder'] || '';
    this.step = options['step'] || null;
  }

  get min() {
    return <number>this.validators['min'] || null;
  }
  set min(value: number) {
    if (typeof (value) === 'number') this.validators['min'] = value
    else delete this.validators['min'];
  }
  get max() {
    return <number>this.validators['max'] || null;
  }
  set max(value: number) {
    if (typeof (value) === 'number') this.validators['max'] = value
    else delete this.validators['max'];
  }
}   