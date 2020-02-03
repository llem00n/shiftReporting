import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DynControl } from '../dynamic-controls/models';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  @Input() controls: DynControl[];
  @Input() values;
  @Output() form = new EventEmitter<FormGroup>()

  customForm: FormGroup = new FormGroup({});

  ngOnChanges() {
    this.customForm = this.createForm(this.controls);
  }
  createForm(controls): FormGroup {

    const group = new FormGroup({});
    controls.map(i => {
      const validators: ValidatorFn[] = [];
      i.validators && Object.keys(i.validators).map(key => {
        if (typeof (i.validators[key]) === 'boolean') validators.push(Validators[key])
        else validators.push(Validators[key](i.validators[key]));

      });
      group.addControl(i.key, new FormControl(this.values && this.values[i.key] || null, validators));
    });
    this.form.emit(group);
    return group;
  }
}
