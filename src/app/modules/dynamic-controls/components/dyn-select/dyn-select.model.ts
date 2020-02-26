import { BaseControl } from '../base/base.model';

export class DynSelect extends BaseControl {
  type = 'select';
  options: { value: string, viewValue: string }[];
  placeholder?: string;
  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.placeholder = opt['placeholder'] || '';
    this.options = opt['options'] || [];
  }
} 