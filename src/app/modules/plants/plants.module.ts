import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantCardComponent } from './components/plant-card.component';



@NgModule({
  declarations: [PlantCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PlantCardComponent
  ]
})
export class PlantsModule { }
