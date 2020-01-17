import { BaseControl } from '../base/base.model';

export interface Select extends BaseControl {  
  options: string[];
  plaseholder?: string;
} 