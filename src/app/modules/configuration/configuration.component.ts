import { Component, OnInit } from '@angular/core';
import { Input } from '../dynamic-controls/components/input/input.model';
import { FormGroup, FormControl } from '@angular/forms';
import { DynControl } from '../dynamic-controls/models';
import { Store, select } from '@ngrx/store';
import { State, allPlants, plantState } from 'src/app/app-store/';
import { PlantActions } from 'src/app/app-store/actions';
import { map, tap } from 'rxjs/operators';
import { Plant } from 'src/app/app-store/plant/plant.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {


  form: FormGroup;
  childForm: FormGroup = new FormGroup({});
  addForm: FormGroup;

  isShow: { [key: string]: boolean } = {
    configPlants: true,
    configDepartments: false
  };

  configControls = {
    Plant: [
      <Input>{ key: 'Name', type: 'input', label: 'Name', validators: ['required'], placeholder: 'Something' },
      <Input>{ key: 'Code', type: 'input', label: 'Code', validators: ['required'] },
      <Input>{ key: 'Address', type: 'input', label: 'Address', validators: ['required'] },
    ],
    Department: [
      <Input>{ key: 'Name', type: 'input', label: 'Name' },
      <Input>{ key: 'Description', type: 'input', label: 'Description' },
    ]
  }

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
  }
}
