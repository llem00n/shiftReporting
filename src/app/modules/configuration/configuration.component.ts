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

  showedAddForm: string = null;
  plants: Plant[];
  formConfiguration = [
    { key: 'Plant', type: 'select', label: 'Plant', options: [], placeholder: 'Select plant' },
    { key: 'Department', type: 'input', label: 'Department' }
  ]


  form: FormGroup;
  childForm: FormGroup = new FormGroup({});
  addForm: FormGroup;
  configControls = {
    Plant: [
      <Input>{ key: 'Name', type: 'input', label: 'Name', validators: ['required'] },
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
    this.store.pipe(
      select(allPlants),
      tap(plants => { if (plants.length > 0) this.formConfiguration[0]['enableShowList'] = true }),
      tap(plants => this.formConfiguration[0]['list'] = plants),

      map(plants => this.formConfiguration[0].options = plants.map(i => {
        this.showedAddForm = null
        return {
          value: i.plantId,
          valueView: `${i.name} (${i.code}, ${i.address})`
        }
      })
      )
    ).subscribe();
    this.store.dispatch(PlantActions.loadPlants());
    this.form = this.createForm(this.formConfiguration)
  }
  createForm(config: DynControl[]): FormGroup {
    const group = new FormGroup({})
    config.map(i => {
      group.addControl(i.key, new FormControl(''))
    })
    return group;
  }

  childFormCreated(form) {
    this.childForm = form;
  }

  addItem(key) {
    const payload = this.childForm.value;
    switch (key) {
      case 'Plant':
        this.store.dispatch(PlantActions.addPlant({ plant: payload }))
        break;
      default:
        break;
    }
  }

  deletePlant(id){
    this.store.dispatch(PlantActions.deletePlant({ id }))
  }
}
