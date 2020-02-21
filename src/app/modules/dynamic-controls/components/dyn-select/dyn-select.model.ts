import { BaseControl } from '../base/base.model';

export interface DynSelect extends BaseControl {
  options: { value: string, viewValue: string }[];
  placeholder?: string;
} 