import { BaseControl } from '../base/base.model';

export class DynTextarea extends BaseControl {
  type = 'textarea';
  valueType = 'string';
  placeholder?: string;
  diffGridItem = {
    maxItemRows: Infinity,
  }
  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.placeholder = opt['placeholder'] || '';
    this.gridItem && Object.assign(this.gridItem, this.diffGridItem)
    this.name = opt['name'] || this.type;
  }
} 