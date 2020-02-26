import { BaseControl } from '../base/base.model';

export class DynColor extends BaseControl {
  type = 'color';
  valueType = 'string';
  constructor(options: {} = {}) {
    super(options);
    this.controlId = this.controlId || this.createControlId(this.type);

  }
} 