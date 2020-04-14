import { BaseControl } from '../base/base.model';

export class DynLabel extends BaseControl {
  type = 'label';
  valueType = 'string';
  forControl: string;

  constructor(opt: {} = {}) {
    super(opt);    
    this.forControl = opt['forControl'] || null;
    this.controlId = this.controlId || this.createControlId(this.type);
    
  }
} 