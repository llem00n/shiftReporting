import { Component, OnInit } from '@angular/core';
import { Input } from '../dynamic-controls/components/input/input.model';
import { FormGroup, FormControl } from '@angular/forms';
import { DynControl } from '../dynamic-controls/models';
import { Store, select } from '@ngrx/store';
import { State, allPlants, plantState } from 'src/app/app-store/';
import { PlantActions } from 'src/app/app-store/actions';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  showedAddForm: string = null;

  // formConfiguration = [
  //   { key: 'Plant', type: 'select', label: 'Plant', options: [] },
  //   { key: 'Department', type: 'input', label: 'Department' }
  // ]
  formConfiguration = {
    Plant: { key: 'Plant', type: 'select', label: 'Plant', options: [] },
    Department: { key: 'Department', type: 'input', label: 'Department' }
  }



  form: FormGroup;
  addForm: FormGroup;

  configControls = {
    Plant: [
      <Input>{ key: 'Name', type: 'input', label: 'Name' },
      <Input>{ key: 'Code', type: 'input', label: 'Code' },
      <Input>{ key: 'Address', type: 'input', label: 'Address' },
    ],
    Department: [
      <Input>{ key: 'Name', type: 'input', label: 'Name' },
      <Input>{ key: 'Description', type: 'input', label: 'Description' },
      <Input>{ key: 'qwe', type: 'input' },
    ]
  }


  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.store.pipe(
      select(allPlants),
      tap(plants => this.formConfiguration[0])
    ).subscribe(console.log);


    this.store.dispatch(PlantActions.loadPlants());
    this.form = this.createForm(this.formConfiguration)
  }

  createForm(config: { [key: string]: DynControl }): FormGroup {
    const group = new FormGroup({})
    Object.keys(config).map(key => {
      group.addControl(key, new FormControl(''))
    })
    return group;
  }

  showAddForm(key: string): void {
    this.showedAddForm = this.showedAddForm !== key ? key : null;

  }
}
