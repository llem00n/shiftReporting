import { BaseControl } from '../base/base.model';

export class DynText extends BaseControl {
  type = 'text';
  valueType = 'string';
  placeholder?: string;
  constructor(options: {} = {}) {
    super(options);
    this.key = this.key || this.createKey(this.type);
    this.placeholder = options['placeholder'] || '';

  }
} 