import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DynControl } from '../dynamic-controls/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnChanges {
  @Input() controls: DynControl[];
  @Input() values: { [key: string]: string | number }
  @Output() form = new EventEmitter<FormGroup>()

  customForm: FormGroup = new FormGroup({});

  ngOnChanges() {
    // console.log(this.values);
    this.customForm = this.createForm(this.controls);
  }
  createForm(controls): FormGroup {
    // console.log(this.values);

    const group = new FormGroup({});
    controls.map(i => {
      group.addControl(i.key, new FormControl(this.values && this.values[i.key] || null, [Validators.required]));
    });
    this.form.emit(group);
    // console.log(group.value);
    return group;
  }
}
