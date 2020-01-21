import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynControl } from '../dynamic-controls/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() controls: DynControl[];
  @Output() form = new EventEmitter<FormGroup>()

  customForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.customForm = this.createForm(this.controls);
  }
  createForm(controls): FormGroup {
    const group = new FormGroup({});
    controls.map(i => {
      group.addControl(i.key, new FormControl(i.value,[Validators.required] ));
    });
    this.form.emit(group);
    return group;
  }
}
