import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/app-store/plant/plant.reducer';
import { allPlants } from 'src/app/app-store';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { PlantActions } from '@actions/*';
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
  ) { }

  plants: Plant[] = null;
  configPlant = [
    new DynText({ controlId: 'name', label: 'Name', validators: { required: true } }),
    new DynText({ controlId: 'code', label: 'Code', validators: { required: true } }),
    new DynText({ controlId: 'address', label: 'Address', validators: { required: true } }),
  ];
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
  addPlant() {
    this.openDialog({})
  }
  delete(id) {
    this.store.dispatch(PlantActions.deletePlant({ id }))
  }
  edit(id) {
    const plant = this.plants.find(i => i.plantId === id)
    this.openDialog(plant)
  }
  openDialog(data) {
    const dialogRef = this.dialogService.open(PlantFormComponent, data)
    dialogRef.afterClosed().subscribe(plant => {
      if (!plant) return;
      if (plant.plantId) {
        this.store.dispatch(PlantActions.updatePlant({ plant }))
      } else {
        delete plant.plantId;
        this.store.dispatch(PlantActions.addPlant({ plant }))
      }
    });
  }

}
