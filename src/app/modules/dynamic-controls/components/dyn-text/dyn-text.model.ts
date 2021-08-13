import { BaseControl } from '../base/base.model';

export class DynText extends BaseControl {
  type = 'text';
  valueType = 'string';
  placeholder?: string;
  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.placeholder = opt['placeholder'] || '';
    this.name = opt['name'] || this.type;

  }
} 