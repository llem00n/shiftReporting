import { BaseControl } from '../base/base.model';

export class DynDatetime extends BaseControl {
  type = 'datetime';
  valueType = 'datetime';
  min: string;
  max: string;

  private _settings = [
    { controlId: 'startShiftDatetimeValidation', label: 'Minimum start of the shift', type: 'checkbox' },
    { controlId: 'endShiftDatetimeValidation', label: 'Maximum end of the shift', type: 'checkbox' },
  ]

  constructor(opt: {} = {}) {
    super(opt);
    this.settings = this.settings.concat(this._settings);

    this.controlId = this.controlId || this.createControlId(this.type);
    this.name = opt['name'] || this.type
  }
  get startShiftDatetimeValidation() {
    return <boolean>this.validators['startShiftDatetimeValidation'] || false;
  }
  set startShiftDatetimeValidation(value: boolean) {
    if (value) this.validators['startShiftDatetimeValidation'] = value;
    else delete this.validators['startShiftDatetimeValidation'];
  }
  get endShiftDatetimeValidation() {
    return <boolean>this.validators['endShiftDatetimeValidation'] || false;
  }
  set endShiftDatetimeValidation(value: boolean) {
    if (value) this.validators['endShiftDatetimeValidation'] = value
    else delete this.validators['endShiftDatetimeValidation'];
  }
} 