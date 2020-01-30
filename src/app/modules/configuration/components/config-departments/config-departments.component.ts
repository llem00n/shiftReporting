import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select } from 'src/app/modules/dynamic-controls/components/select/select.model';
import { Store, select } from '@ngrx/store';
import { State, allPlants, allDepartments } from 'src/app/app-store';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { PlantActions, DepartmentActions } from '@actions/*';
import { ListData } from '../list/list.component';
import { Department } from 'src/app/app-store/department/department.model';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-config-departments',
  templateUrl: './config-departments.component.html',
  styleUrls: ['./config-departments.component.scss']
})
export class ConfigDepartmentsComponent implements OnInit {

  list: ListData;
  plantsList = []
  preConfigForm: FormGroup;
  preConfig = [
    <Select>{ key: 'plantId', type: 'select', label: 'Plant', validators: ['required'], options: [], placeholder: 'Select plant' },
  ]


  constructor(
    private store: Store<State>,
    private confService: ConfigurationService
  ) { }

  ngOnInit() {
    this.getPlants();
    this.getDepartments()
  }
  getPlants() {
    let respCount = 0;
    this.store.pipe(
      select(allPlants),
    ).subscribe((plants: Plant[]) => {
      if (plants.length === 0 && respCount === 0) {
        ++respCount;
        this.store.dispatch(PlantActions.loadPlants());
        return;
      };
      this.preConfig[0].options = plants.map(plant => {
        return {
          value: plant.plantId,
          viewValue: `${plant.name} (${plant.code}, ${plant.address})`
        }
      })
    })
  }

  getDepartments() {
    this.store.pipe(
      select(allDepartments),
    ).subscribe((departments: Department[]) => {
      if (!departments.length) return;
      this.list = this.confService.createList(departments);
    })

  }


  getPreConfigForm(e: FormGroup) {
    e.valueChanges.subscribe(
      value => {
        const plantId = +value.plantId;
        console.log(plantId);        
        this.store.dispatch(DepartmentActions.loadDepartments({ plantId }))
      }
    )
    console.log(e);
  }

}
