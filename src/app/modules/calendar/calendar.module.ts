import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { WeekGridComponent } from './components/week-grid/week-grid.component';



@NgModule({
  declarations: [CalendarComponent, WeekGridComponent],
  imports: [
    CommonModule
  ]
})
export class CalendarModule { }
