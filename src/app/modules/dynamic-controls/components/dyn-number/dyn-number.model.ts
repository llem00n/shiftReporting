import { BaseControl } from '../base/base.model';

export class DynNumber extends BaseControl {
  type = 'number'
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  constructor(options: {} = {}) {
    super(options);
    this.controlId = this.controlId || this.createControlId(this.type);
    this.placeholder = options['placeholder'] || '';
    this.min = options['min'] || null;
    this.max = options['max'] || null;
    this.step = options['step'] || null;

  }
} 