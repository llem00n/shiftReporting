import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/app-store/plant/plant.reducer';
import { allPlants } from 'src/app/app-store';
// import { ListData } from '../list/list.component';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { DynInput } from 'src/app/modules/dynamic-controls/components/input/input.model';
import { FormGroup } from '@angular/forms';
import { PlantActions } from '@actions/*';
// import { ConfigurationService } from '../../services/configuration.service';
import { DynText } from 'src/app/modules/dynamic-controls/components/dyn-text/dyn-text.model';
import { DialogService } from 'src/app/modules/dialog/dialog.service';
import { PlantFormComponent } from '../plant-form/plant-form.component';

@Component({
  selector: 'app-config-plants',
  templateUrl: './config-plants.component.html',
  styleUrls: ['./config-plants.component.scss']
})
export class ConfigPlantsComponent implements OnInit {

  constructor(
    private store: Store<State>,
    private dialogService: DialogService,
    // private confService: ConfigurationService
  ) { }

  plants: Plant[] = null;
  // formAddPlant: FormGroup = new FormGroup({})
  // formEditPlant: FormGroup = new FormGroup({})
  // editingPlant: Plant;
  // isShowEditPanel = false;
  // showedAddForm = false;

  configPlant = [
    new DynText({ controlId: 'name', type: 'text', label: 'Name', validators: { required: true } }),
    new DynText({ controlId: 'code', type: 'text', label: 'Code', validators: { required: true } }),
    new DynText({ controlId: 'address', type: 'text', label: 'Address', validators: { required: true } }),
  ];

  // editOptions = {
  //   properties: this.configPlant,
  //   actType: 'edit',
  //   objectType: 'plant'
  // }
  // addNewOptions = {
  //   properties: this.configPlant,
  //   actType: 'new',
  //   objectType: 'plant'
  // }

  ngOnInit() {
    this.getPlants()
  }
  getPlants() {
    let respCount = 0;
    this.store.pipe(
      select(allPlants),
    ).subscribe((plants: Plant[]) => {
      if (plants.length === 0 && respCount === 0) {
        ++respCount;
        this.store.dispatch(PlantActions.loadPlants());
        return
      };
      this.plants = plants;
    })
  }
  // addPlant(e) {
  //   this.showedAddForm = false;
  //   this.store.dispatch(PlantActions.addPlant({ plant: e }))
  // }
  // updatePlant(e) {
  //   const plant: Plant = { ...this.editingPlant }
  //   Object.assign(plant, e)
  //   this.store.dispatch(PlantActions.updatePlant({ plant }))
  //   this.isShowEditPanel = false;
  // }
  // clickListsButton(e) {
  //   switch (e.action) {
  //     case 'edit':
  //       // this.editingPlant = e.item;
  //       // this.isShowEditPanel = true;
  //       break;
  //     case 'dlt':
  //       this.store.dispatch(PlantActions.deletePlant({ id: e.item.plantId }))
  //       break
  //   }
  // }
  addPlant() {
    this.openDialog({})
  }
  delete(id) {
    this.store.dispatch(PlantActions.deletePlant({ id }))
  }
  edit(id) {
    console.log(id);
    
    const plant = this.plants.find(i => i.plantId === id)
    this.openDialog(plant)
  }

  openDialog(data) {
    const dialogRef = this.dialogService.open(PlantFormComponent, data)
    dialogRef.afterClosed().subscribe(plant => {
      console.log(plant);
      if (plant.plantId) {
        this.store.dispatch(PlantActions.updatePlant({ plant }))
      } else {
        delete plant.plantId;
        this.store.dispatch(PlantActions.addPlant({ plant }))
      }
    });
  }

}
