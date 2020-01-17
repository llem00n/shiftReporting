import { Input } from '../components/input/input.model';
import { Select } from '../components/select/select.model';
import { BaseControl } from '../components/base/base.model';

export type DynControl =
  BaseControl
  | Input
  | Select;