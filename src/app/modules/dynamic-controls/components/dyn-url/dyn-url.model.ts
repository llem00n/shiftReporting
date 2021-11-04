import { BaseControl } from "@models/*";

export class DynUrl extends BaseControl {
  type = 'url';
  valueType = 'string';

  private _settings = [
    { controlId: 'url', label: 'Url', type: 'inputUrl' },
  ]
  constructor(opt: {} = {}) {
    super(opt);
    this.settings = this.settings.filter(s => s.controlId !== 'isRequired' && s.controlId !== 'name');
    this.settings = this.settings.concat(this._settings);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.name = opt['name'] || this.type;
  }
} 