import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DynControl } from '../dynamic-controls/models';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  _controls: DynControl[];
  @Input()
  set controls(controls: DynControl[] | Map<string, DynControl>) {
    if (controls['__proto__'].constructor.name === 'Array') this._controls = <DynControl[]>controls;
    else {
      const result: DynControl[] = [];
      controls.forEach((i, controlId) => {
        result.push({ ...i, controlId: controlId })
      })
      this._controls = result
    }
  }
  get controls() { return this._controls }

  @Input() values;
  @Input() flex: boolean;
  @Output() form = new EventEmitter<FormGroup>()

  customForm: FormGroup = new FormGroup({});

  ngOnChanges() {
    this.customForm = this.createForm(this.controls);
  }
  createForm(controls): FormGroup {
    const group = new FormGroup({});
    controls.map(i => {
      const validators: ValidatorFn[] = [];
      i.validators && Object.keys(i.validators).map(controlId => {
        if (typeof (i.validators[controlId]) === 'boolean') validators.push(Validators[controlId])
        else validators.push(Validators[controlId](i.validators[controlId]));
      });
      group.addControl(i.controlId, new FormControl(this.setValue(i, this.values), validators));
    });
    this.form.emit(group);
    return group;
  }
  setValue(control: DynControl, values): string | boolean | number {
    // if (control.type === 'checkbox') return values ? values[control.controlId] : false;
    if (!values
      || values[control.controlId] === null
      || values[control.controlId] === undefined) return null;
    switch (control.type) {
      case 'datetime':
        const a = new Date(values[control.controlId])
        return new Date(a.valueOf() - a.getTimezoneOffset() * 1000 * 60).toJSON().slice(0, 16);
      default:
        return values[control.controlId]
    }
  }

}
