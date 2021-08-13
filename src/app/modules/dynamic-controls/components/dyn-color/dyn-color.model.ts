import { BaseControl } from '../base/base.model';

export class DynColor extends BaseControl {
  type = 'color';
  valueType = 'string';
  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.name = opt['name'] || this.type

  }
} 