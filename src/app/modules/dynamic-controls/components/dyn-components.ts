import { InputComponent } from "./input/input.component";
import { DynSelectComponent } from './dyn-select/dyn-select.component';
import { DynDatetimeComponent } from './dyn-datetime/dyn-datetime.component';
import { DynCheckboxComponent } from './dyn-checkbox/dyn-checkbox.component';
import { DynNumberComponent } from './dyn-number/dyn-number.component';
import { DynTimeComponent } from './dyn-time/dyn-time.component';
import { DynTextComponent } from './dyn-text/dyn-text.component';
import { DynTextareaComponent } from './dyn-textarea/dyn-textarea.component';
import { DynColorComponent } from './dyn-color/dyn-color.component';

export const dynComponents = {
  get: function (type) { return this[type] },
  input: InputComponent,
  select: DynSelectComponent,
  datetime: DynDatetimeComponent,
  checkbox: DynCheckboxComponent,
  number: DynNumberComponent,
  time: DynTimeComponent,
  text: DynTextComponent,
  textarea: DynTextareaComponent,
  color: DynColorComponent,
}

