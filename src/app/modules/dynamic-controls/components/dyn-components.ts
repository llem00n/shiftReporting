import { InputComponent } from "./input/input.component";
import { DynSelectComponent } from './dyn-select/dyn-select.component';
import { DynDatetimeComponent } from './dyn-datetime/dyn-datetime.component';
import { DynCheckboxComponent } from './dyn-checkbox/dyn-checkbox.component';
import { DynNumberComponent } from './dyn-number/dyn-number.component';
import { DynTimeComponent } from './dyn-time/dyn-time.component';
import { DynTextComponent } from './dyn-text/dyn-text.component';
import { DynTextareaComponent } from './dyn-textarea/dyn-textarea.component';
import { DynColorComponent } from './dyn-color/dyn-color.component';
import { DynText } from './dyn-text/dyn-text.model';
import { DynCheckbox } from './dyn-checkbox/dyn-checkbox.model';
import { DynDatetime } from './dyn-datetime/dyn-datetime.model';
import { DynColor } from './dyn-color/dyn-color.model';
import { DynNumber } from './dyn-number/dyn-number.model';
import { DynSelect } from './dyn-select/dyn-select.model';
import { DynTime } from './dyn-time/dyn-time.model';
import { DynTextarea } from './dyn-textarea/dyn-textarea.model';
import { DynLabelComponent } from './dyn-label/dyn-label.component';
import { DynLabel } from './dyn-label/dyn-label.model';
import { DynDate } from './dyn-date/dyn-date.model';
import { DynDateComponent } from './dyn-date/dyn-date.component';

export const dynComponents = {
  get: function (type) { return this[type].component },
  getList: function () {
    return Object.keys(this).filter(i => this[i].title).map(i => { return { title: this[i].title, key: i } })
  },
  getModel: function (type) { return this[type].model || null },
  // input: { component: InputComponent, title: 'Input' },
  select: { component: DynSelectComponent, title: 'Select', model: DynSelect },
  datetime: { component: DynDatetimeComponent, title: 'Datetime', model: DynDatetime },
  checkbox: { component: DynCheckboxComponent, title: 'Checkbox', model: DynCheckbox },
  number: { component: DynNumberComponent, title: 'Number', model: DynNumber },
  time: { component: DynTimeComponent, title: 'Time', model: DynTime },
  text: { component: DynTextComponent, title: 'Text', model: DynText },
  textarea: { component: DynTextareaComponent, title: 'Textarea', model: DynTextarea },
  color: { component: DynColorComponent, title: 'Color', model: DynColor },
  label: { component: DynLabelComponent, title: 'Label', model: DynLabel },
  date: { component: DynDateComponent, title: 'Date', model: DynDate },
}

