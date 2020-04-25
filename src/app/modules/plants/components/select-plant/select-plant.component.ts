import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Plant, State } from '@models/*';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { allPlants } from 'src/app/app-store';

@Component({
  selector: 'app-select-plant',
  templateUrl: './select-plant.component.html',
  styleUrls: ['./select-plant.component.scss']
})
export class SelectPlantComponent implements OnInit {
  @Output() changePlant = new EventEmitter<Plant>()
  plant = new FormControl(null);
  plants: Plant[]
  constructor(
    // private authService: AuthorizationService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.select(allPlants).subscribe(plants => {
      this.plants = plants;
      plants.length && this.plant.setValue(plants[0].plantId);
    });
    this.plant.valueChanges.subscribe(val => {
      const plant = this.plants.find(d => d.plantId == val);
      this.changePlant.emit(plant);
    })
  }
}
