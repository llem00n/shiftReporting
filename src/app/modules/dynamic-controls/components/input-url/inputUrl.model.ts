import { BaseControl } from '../base/base.model';

export class DynInputUrl extends BaseControl {  
  type = "inputUrl";
  placeholder?: string;
  inputType?: string;

  constructor(opt: {} = {}) {
    super(opt);
    this.controlId = this.controlId || this.createControlId(this.type); 
    this.name = opt['name'] || this.type
  }
} 