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
import { DynInput } from 'src/app/modules/dynamic-controls/components/input/input.model';

@Component({
  selector: 'app-config-departments',
  templateUrl: './config-departments.component.html',
  styleUrls: ['./config-departments.component.scss']
})
export class ConfigDepartmentsComponent implements OnInit {
  isShowPanels: { [key: string]: boolean } = {};


  list: ListData;
  plantsList = []
  preConfigForm: FormGroup;
  preConfig = [
    <Select>{
      key: 'plantId',
      type: 'select',
      label: 'Plant',
      validators: { required: true },
      options: [],
      placeholder: 'Select plant'
    },
  ]
  editingObj: Department;

  configDepartment = [
    <DynInput>{ key: 'name', type: 'input', label: 'Name', validators: { required: true } },
    <DynInput>{ key: 'description', type: 'input', label: 'Description' },
  ]

  editOptions = {
    properties: this.configDepartment,
    actType: 'edit',
    objectType: 'plant'
  }
  addNewOptions = {
    properties: this.configDepartment,
    actType: 'new',
    objectType: 'plant'
  }


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
      // if (!departments.length) return;
      this.list = this.confService.createList(departments);
    })
  }

  getPreConfigForm(e: FormGroup) {
    this.preConfigForm = e;
    e.valueChanges.subscribe(
      value => {
        const plantId = +value.plantId;
        this.store.dispatch(DepartmentActions.loadDepartments({ plantId }))
      }
    )
  }

  clickListsButton(e) {
    switch (e.action) {
      case 'edit':
        this.editingObj = e.item;
        this.isShowPanels.edit = true;
        break;
      case 'dlt':
        this.store.dispatch(DepartmentActions.deleteDepartment({ id: e.item.departmentId }))
        break
    }
  }
  updateObj(e) {
    let department = { ...this.editingObj }
    this.isShowPanels.edit = false;
    Object.assign(department, e);
    this.store.dispatch(DepartmentActions.updateDepartment({ department }))
  }

  addObj(e) {
    let department = <Department>{};
    this.isShowPanels.add = false;
    Object.assign(department, this.preConfigForm.value, e);
    this.store.dispatch(DepartmentActions.addDepartment({ department }))
  }
}
