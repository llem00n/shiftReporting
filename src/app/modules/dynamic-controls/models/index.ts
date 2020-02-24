import { DynInput } from '../components/input/input.model';
import { Select } from '../components/select/select.model';
import { BaseControl } from '../components/base/base.model';
import { DynDatetime } from '../components/dyn-datetime/dyn-datetime.model';
import { DynTextarea } from '../components/dyn-textarea/dyn-textarea.model';
import { DynTime } from '../components/dyn-time/dyn-time.model';
import { DynSelect } from '../components/dyn-select/dyn-select.model';
import { DynNumber } from '../components/dyn-number/dyn-number.model';
import { DynColor } from '../components/dyn-color/dyn-color.model';
import { DynCheckbox } from '../components/dyn-checkbox/dyn-checkbox.model';

export type DynControl =
  BaseControl
  | DynDatetime
  | DynInput
  | DynTextarea
  | DynTime
  | DynSelect
  | DynNumber
  | DynColor
  | DynCheckbox
