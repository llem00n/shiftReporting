import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesComponent } from './schedules.component';
import { ScheduleCardComponent } from './components/schedule-card/schedule-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DepartmentsModule } from '../departments/departments.module';
import { ShiftsModule } from '../shifts/shifts.module';
import { ScheduleFormComponent } from './components/schedule-form/schedule-form.component';



@NgModule({
  declarations: [SchedulesComponent, ScheduleCardComponent, ScheduleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModule,
    UsedMaterialModule,
    DepartmentsModule,
    ShiftsModule
  ]
})
export class SchedulesModule { }
