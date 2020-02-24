import { BaseControl } from '../base/base.model';

export class DynCheckbox extends BaseControl {
  type = 'checkbox';
  valueType = 'boolean';
  gridItemOptions = {
    cols:1,
    resizeEnabled: false,

  }
  constructor(options: {} = {}) {
    super(options);
    this.key = this.key || this.createKey(this.type);

  }
} 