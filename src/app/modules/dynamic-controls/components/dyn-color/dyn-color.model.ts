import { BaseControl } from '../base/base.model';

export class DynColor extends BaseControl {
  type = 'color';
  valueType = 'string';
  constructor(options: {} = {}) {
    super(options);
    this.key = this.key || this.createKey(this.type);

  }
} 