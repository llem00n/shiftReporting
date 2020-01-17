import { Component, OnInit, Input } from '@angular/core';
import { DynControl } from '../dynamic-controls/models';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() controls: DynControl[];

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    console.log('formInput => ', this.controls);
    this.form = this.createForm(this.controls);
  }
  createForm(controls): FormGroup {
    const group = new FormGroup({});
    controls.map(i => {
      group.addControl(i.key, new FormControl(i.value));
    });
    return group;
  }
}
