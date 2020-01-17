import { Component, OnInit } from '@angular/core';
import { Input } from '../dynamic-controls/components/input/input.model';
import { FormGroup, FormControl } from '@angular/forms';
import { DynControl } from '../dynamic-controls/models';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  formConfiguration = [
    { key: 'Plant', type: 'select', label: 'Plant' },
    { key: 'Department', type: 'input', label: 'Department' }
  ]



  form: FormGroup;


  plantConfig = [
    <Input>{ key: 'Name', type: 'input' },
    <Input>{ key: 'Code', type: 'input' },
    <Input>{ key: 'Address', type: 'input' },
  ]
  constructor() { }

  ngOnInit() {
    this.form = this.createForm(this.formConfiguration)
  }

  createForm(controls: DynControl[]): FormGroup {
    const group = new FormGroup({})
    controls.map(i => {
      group.addControl(i.key, new FormControl(''))
    })
    return group
  }
}
