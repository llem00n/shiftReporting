import { BaseControl } from '../base/base.model';

export class DynDatetime extends BaseControl {
  type = 'datetime';
  valueType = 'datetime'
  constructor(options: {} = {}) {
    super(options);
    this.controlId = this.controlId || this.createControlId(this.type);

  }
} 