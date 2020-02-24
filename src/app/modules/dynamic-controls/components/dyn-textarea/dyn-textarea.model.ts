import { BaseControl } from '../base/base.model';

export class DynTextarea extends BaseControl {  
  type = 'textarea';
  valueType = 'string';
  placeholder?: string;
  constructor(opt: {} = {}) {
    super(opt);
    this.key = this.key || this.createKey(this.type);
    this.placeholder = opt['placeholder'] || '';
  }
} 