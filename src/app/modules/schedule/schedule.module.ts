import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { FormModule } from '../form/form.module';



@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    FormModule,
    CommonModule,    
  ]
})
export class ScheduleModule { }
