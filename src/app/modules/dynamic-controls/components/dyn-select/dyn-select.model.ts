import { BaseControl } from '../base/base.model';

export class DynSelect extends BaseControl {
  type = 'select';
  private _options: { value: string, viewValue: string }[] = [];
  placeholder?: string;
  private _settings = [
    { controlId: 'placeholder', label: 'Placeholder', type: 'text' },
    { controlId: 'optionsString', label: 'Options', type: 'textarea' },
  ]
  constructor(opt: {} = {}) {
    super(opt);
    this.settings = this.settings.concat(this._settings);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.placeholder = opt['placeholder'] || '';
  }

  get options() { return this._options }
  set options(options) { this._options = options }
  get optionsString() { return this._options.map(i => i.value).join('\n') }
  set optionsString(options) {
    this._options = options.split('\n')
      .filter(i => i !== '')
      .map(i => { return { value: i, viewValue: i } })
  }
} 