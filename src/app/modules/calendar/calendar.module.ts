import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { WeekGridComponent } from './components/week-grid/week-grid.component';
import { WeekSelectorComponent } from './components/week-selector/week-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';



@NgModule({
  declarations: [CalendarComponent, WeekGridComponent, WeekSelectorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),

  ]
})
export class CalendarModule { }
