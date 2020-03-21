import { Component, OnInit } from '@angular/core';
import { Schedule, State } from '@models/*';
import { ScheduleActions } from '@actions/*';
import { Store, select } from '@ngrx/store';
import { allSchedules } from 'src/app/app-store';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  schedules: Schedule[];


  departmentId = 2;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(ScheduleActions.getSchedules({ departmentId: this.departmentId }))
    this.store.pipe(
      select(allSchedules)
    ).subscribe(schedules => this.schedules = schedules)
  }
}
