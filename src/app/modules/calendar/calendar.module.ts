import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { WeekGridComponent } from './components/week-grid/week-grid.component';
import { WeekSelectorComponent } from './components/week-selector/week-selector.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DepartmentsModule } from '../departments/departments.module';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';
import { UsedMaterialModule } from '../used-material/used-material.module';



@NgModule({
  declarations: [CalendarComponent, WeekGridComponent, WeekSelectorComponent, TemplatesListComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot(),
    DepartmentsModule,
    UsedMaterialModule,
  ]
})
export class CalendarModule { }
