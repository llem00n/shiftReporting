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
  getList: function () {
    return Object.keys(this).filter(i => this[i].title).map(i => this[i].title)
  },
  // input: { component: InputComponent, title: 'Input' },
  select: { component: DynSelectComponent, title: 'Select' },
  datetime: { component: DynDatetimeComponent, title: 'Datetime' },
  checkbox: { component: DynCheckboxComponent, title: 'Checkbox' },
  number: { component: DynNumberComponent, title: 'Number' },
  time: { component: DynTimeComponent, title: 'Time' },
  text: { component: DynTextComponent, title: 'Text' },
  textarea: { component: DynTextareaComponent, title: 'Textarea' },
  color: { component: DynColorComponent, title: 'Color' },
}

