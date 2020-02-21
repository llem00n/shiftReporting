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
  get: function (type) { return this[type].component },
  input: { component: InputComponent, name: 'Input' },
  select: { component: DynSelectComponent, name: 'Select' },
  datetime: { component: DynDatetimeComponent, name: 'Datetime' },
  checkbox: { component: DynCheckboxComponent, name: 'Checkbox' },
  number: { component: DynNumberComponent, name: 'Number' },
  time: { component: DynTimeComponent, name: 'Time' },
  text: { component: DynTextComponent, name: 'Text' },
  textarea: { component: DynTextareaComponent, name: 'Textarea' },
  color: { component: DynColorComponent, name: 'Color' },
}

