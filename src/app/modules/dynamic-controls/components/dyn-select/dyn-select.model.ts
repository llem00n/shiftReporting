import { BaseControl } from '../base/base.model';

export class DynSelect extends BaseControl {
  type = 'select';
  placeholder?: string;
  options: { value: string | number, viewValue: string }[];
  multiple: boolean;
  private _settings = [
    // { controlId: 'placeholder', label: 'Placeholder', type: 'text' },
    { controlId: 'optionsString', label: 'Options', type: 'textarea' },
  ]
  constructor(opt: {} = {}) {
    super(opt);
    this.settings = this.settings.concat(this._settings);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.placeholder = opt['placeholder'] || '';
    this.options = opt['options'] || [];
    this.name = opt['name'] || this.type;
    this.multiple = opt['multiple'] || false;
    this.value = opt['selectValue'] || null;
  }
  
  get optionsString() { return this.options.map(i => i.value).join('\n') }
  set optionsString(options) {
    this.options = options.split('\n')
      .filter(i => i !== '')
      .map(i => { return { value: i, viewValue: i } })
  }
} 