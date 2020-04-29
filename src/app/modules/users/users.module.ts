import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersConfigComponent } from './components/users-config/users-config.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormModule } from '../form/form.module';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { UserDepartmentsComponent } from './components/user-departments/user-departments.component';
import { UsersComponent } from './users.component';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserCardComponent, UserFormComponent, UsersConfigComponent, UserRolesComponent, UserDepartmentsComponent, UsersComponent],
  imports: [
    // AngularSvgIconModule.forRoot(),
    CommonModule,
    FormModule,
    UsedMaterialModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
