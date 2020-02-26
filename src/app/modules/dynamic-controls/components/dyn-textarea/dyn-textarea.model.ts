import { BaseControl } from '../base/base.model';

export class DynTextarea extends BaseControl {  
  type = 'textarea';
  valueType = 'string';
  placeholder?: string;
  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.placeholder = opt['placeholder'] || '';
  }
} 