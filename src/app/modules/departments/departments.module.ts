import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectUserDepartmentComponent } from './components/select-user-department/select-user-department.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SelectUserDepartmentComponent],
  imports: [
    AngularSvgIconModule.forRoot(),
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [SelectUserDepartmentComponent]
})
export class DepartmentsModule { }
