import { BaseControl } from '../base/base.model';

export class DynDate extends BaseControl {
  type = 'date';
  valueType = 'datetime'
  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.name = opt['name'] || this.type

  }
} 