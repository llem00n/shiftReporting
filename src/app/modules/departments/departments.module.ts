import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectUserDepartmentComponent } from './components/select-user-department/select-user-department.component';
// import { HttpClientModule } from '@angular/common/http';
// import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { PlantsModule } from '../plants/plants.module';



@NgModule({
  declarations: [SelectUserDepartmentComponent, DepartmentsComponent, DepartmentCardComponent],
  imports: [
    // AngularSvgIconModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    UsedMaterialModule,
    PlantsModule
  ],
  exports: [SelectUserDepartmentComponent]
})
export class DepartmentsModule { }
