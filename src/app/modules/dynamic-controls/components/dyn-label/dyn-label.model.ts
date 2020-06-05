import { BaseControl } from '../base/base.model';

export class DynLabel extends BaseControl {
  type = 'label';
  valueType = 'string';
  forControl: string;

  constructor(opt: {} = {}) {
    super(opt);
    this.settings = this.settings.filter(s => s.controlId !== 'isRequired' && s.controlId !== 'name')
    this.forControl = opt['forControl'] || null;
    this.controlId = this.controlId || this.createControlId(this.type);
    this.name = opt['name'] || this.type
  }
} 