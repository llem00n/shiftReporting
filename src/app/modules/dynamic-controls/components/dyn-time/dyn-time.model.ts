import { BaseControl } from '../base/base.model';

export class DynTime extends BaseControl {
  type = 'time';
  valueType = 'time'
  constructor(opt: {} = {}) {
    super(opt);
    this.key = this.key || this.createKey(this.type);

  }
} 