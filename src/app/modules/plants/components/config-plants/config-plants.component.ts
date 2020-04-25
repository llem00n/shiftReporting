import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/app-store/plant/plant.reducer';
import { allPlants } from 'src/app/app-store';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { PlantActions } from '@actions/*';
import { DynText } from 'src/app/modules/dynamic-controls/components/dyn-text/dyn-text.model';
import { DialogService } from 'src/app/modules/dialog/dialog.service';
import { PlantFormComponent } from '../plant-form/plant-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-config-plants',
  templateUrl: './config-plants.component.html',
  styleUrls: ['./config-plants.component.scss']
})
export class ConfigPlantsComponent implements OnInit {
  plants: Plant[] = [];
  filterPlants: Plant[];
  search = new FormControl('')

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
  ) { }


  ngOnInit() {
    this.getPlants();
    this.search.valueChanges.subscribe(str => this.setFilterPlants(str))
  }

  setFilterPlants(string?: string) {
    if (!string) {
      this.filterPlants = [...this.plants];
      return;
    }
    const str = string.toLowerCase()
    this.filterPlants = this.plants.filter(i => (
      i.name.toLowerCase().includes(str)
      || i.code.toLowerCase().includes(str)
      || i.address.toLowerCase().includes(str)
    ))
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
      this.filterPlants = plants;
      this.search.setValue('')
    })
  }
  addItem() {
    this.openDialog(<Plant>{})
  }
  edit(id) {
    const plant = this.plants.find(i => i.plantId === id)
    this.openDialog(plant)
  }
  openDialog(plant: Plant) {
    const dialogRef = this.dialog.open(PlantFormComponent, { data: { plant } })
    dialogRef.afterClosed().subscribe(plant => {
      if (!plant) return;
      if (plant.plantId) {
        this.store.dispatch(PlantActions.updatePlant({ plant }));
        return;
      }
      this.store.dispatch(PlantActions.addPlant({ plant }));
    });
  }
  delete(id) {
    this.store.dispatch(PlantActions.deletePlant({ id }))
  }
}
