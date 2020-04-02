import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ConfigPlantsComponent } from './components/config-plants/config-plants.component';
import { PlantCardComponent } from './components/plant-card/plant-card.component';
import { PlantFormComponent } from './components/plant-form/plant-form.component';
import { FormModule } from '../form/form.module';
import { UsedMaterialModule } from '../used-material/used-material.module';
// import { DialogModule } from '../dialog/dialog.module';



@NgModule({
  declarations: [PlantCardComponent, ConfigPlantsComponent, PlantFormComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(),
    FormModule,
    UsedMaterialModule
    // MatInputModule,
    // MatCardModule,
    // MatButtonModule
  ],
  exports: [
    PlantCardComponent, ConfigPlantsComponent
  ]
})
export class PlantsModule { }
