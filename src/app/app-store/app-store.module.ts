import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as fromPlant from './plant/plant.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlantEffects } from './plant/plant.effects';
import * as fromDepartment from './department/department.reducer';
import { DepartmentEffects } from './department/department.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forFeature(fromPlant.plantsFeatureKey, fromPlant.reducer),
    EffectsModule.forRoot([PlantEffects, DepartmentEffects]),
    StoreModule.forFeature(fromDepartment.departmentsFeatureKey, fromDepartment.reducer)
  ]
})
export class AppStoreModule { }
