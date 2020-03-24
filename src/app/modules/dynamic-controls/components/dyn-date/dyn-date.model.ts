import { BaseControl } from '../base/base.model';

export class DynDate extends BaseControl {
  type = 'date';
  valueType = 'datetime'
  constructor(options: {} = {}) {
    super(options);
    this.controlId = this.controlId || this.createControlId(this.type);

  }
} 