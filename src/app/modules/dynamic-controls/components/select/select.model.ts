import { BaseControl } from '../base/base.model';

export interface Select extends BaseControl {
  options: { value: string, viewValue: string }[];
  plaseholder?: string;
} 