import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ConfigPlantsComponent } from './components/config-plants/config-plants.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';



@NgModule({
  declarations: [PlantCardComponent, ConfigPlantsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),

  ],
  exports: [
    PlantCardComponent, ConfigPlantsComponent
  ]
})
export class PlantsModule { }
