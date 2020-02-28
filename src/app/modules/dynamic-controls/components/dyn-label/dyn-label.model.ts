import { BaseControl } from '../base/base.model';

export class DynLabel extends BaseControl {
  type = 'label';
  valueType = 'string';
  private _settings = [
    { controlId: 'value', label: 'Label', type: 'text' },
  ]

  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.settings = this.settings.concat(this._settings);
  }
} 