import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersConfigComponent } from './components/users-config/users-config.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormModule } from '../form/form.module';



@NgModule({
  declarations: [UserCardComponent, UserFormComponent, UsersConfigComponent],
  imports: [
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    CommonModule,
    FormModule
  ]
})
export class UsersModule { }
