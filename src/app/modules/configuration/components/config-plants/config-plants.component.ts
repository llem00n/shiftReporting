import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/app-store/plant/plant.reducer';
import { allPlants } from 'src/app/app-store';
import { ListData } from '../list/list.component';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { Input } from 'src/app/modules/dynamic-controls/components/input/input.model';
import { FormGroup } from '@angular/forms';
import { PlantActions } from '@actions/*';

@Component({
  selector: 'app-config-plants',
  templateUrl: './config-plants.component.html',
  styleUrls: ['./config-plants.component.scss']
})
export class ConfigPlantsComponent implements OnInit {

  constructor(
    private store: Store<State>
  ) { }

  plantList: ListData = null;
  formAddPlant: FormGroup = new FormGroup({})
  formEditPlant: FormGroup = new FormGroup({})
  editingPlant: Plant;
  isShowEditPanel = false;
  showedAddForm = false;

  configPlant = [
    <Input>{ key: 'name', type: 'input', label: 'Name', validators: ['required'], placeholder: 'Name' },
    <Input>{ key: 'code', type: 'input', label: 'Code', validators: ['required'] },
    <Input>{ key: 'address', type: 'input', label: 'Address', validators: ['required'] },
  ];


  ngOnInit() {
    this.getData()
  }
  getData() {
    let respCount = 0;
    this.store.pipe(
      select(allPlants),
    ).subscribe((plants: Plant[]) => {
      if (plants.length === 0 && respCount === 0) {
        ++respCount;
        this.store.dispatch(PlantActions.loadPlants());
        return
      };
      this.plantList = this.createList(plants);
    })
  }

  createList(plants: Plant[]): ListData {
    const list = <ListData>{};
    list.tableData = plants;
    list.head = Object.keys(plants[0]).map(i => {
      return {
        key: i, title: i
      }
    })
    list.actionButtons = [
      { key: 'edit', title: 'Edit' },
      { key: 'dlt', title: 'DLT' }
    ]
    return list;
  }

  addPlantForm(form: FormGroup) {
    this.formAddPlant = form
  }
  addPlant() {
    this.showedAddForm = false;
    this.store.dispatch(PlantActions.addPlant({ plant: this.formAddPlant.value }))
  }
  updatePlant() {
    const plant: Plant = { ...this.editingPlant }
    Object.assign(plant, this.formEditPlant.value)
    this.store.dispatch(PlantActions.updatePlant({ plant }))
    this.isShowEditPanel = false;
  }

  disableUpdateButton(): boolean {
    let res = this.configPlant.filter(i => this.editingPlant[i.key] !== this.formEditPlant.value[i.key])
    return this.formEditPlant.invalid || res.length === 0
  }

  clickListsButton(e) {
    console.log(e);
    switch (e.action) {
      case 'edit':
        this.editingPlant = e.item;
        this.isShowEditPanel = true
    }
  }
  editPlantForm(form) {
    this.formEditPlant = form;
  }
}
