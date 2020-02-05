import { DynInput } from '../components/input/input.model';
import { Select } from '../components/select/select.model';
import { BaseControl } from '../components/base/base.model';
import { DynDatetime } from '../components/dyn-datetime/dyn-datetime.model';

export type DynControl =
  BaseControl
  | DynDatetime
  | DynInput
  | Select;