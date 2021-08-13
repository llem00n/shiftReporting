import { BaseControl } from '../base/base.model';

export class DynCheckbox extends BaseControl {
  type = 'checkbox';
  valueType = 'boolean';
  diffGridItem = {
    cols: 1,
    maxItemCols: 1,
    resizeEnabled: false,

  }
  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.name = opt['name'] || this.type
    this.gridItem && Object.assign(this.gridItem, this.diffGridItem)
  }
} 