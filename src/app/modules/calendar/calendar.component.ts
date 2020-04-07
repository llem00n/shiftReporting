import { Component, OnInit, OnDestroy } from '@angular/core';
import { Schedule, State, DataEntry } from '@models/*';
import { ScheduleActions, TemplateActions, DataEntryActions } from '@actions/*';
import { Store, select } from '@ngrx/store';
import { allSchedules } from 'src/app/app-store';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  schedules: Schedule[];
  date: Date;
  week: number;
  year: number;
  departmentId = null;
  weekYear: { year: number, week: number };
  weekDataEntries: DataEntry[];

  constructor(
    private store: Store<State>,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    this.weekYear = this.dateService.getWeek(this.date);
    this.week = this.weekYear.week;
    this.year = this.weekYear.year;
    this.getSchedules();
  }
  ngOnDestroy() {
    this.store.dispatch(ScheduleActions.clearSchedules());
  }

  getSchedules() {
    this.store.pipe(
      select(allSchedules)
    ).subscribe(schedules => this.schedules = schedules)
  }
  setWeek(e) {
    this.week = e.week;
    this.year = e.year;
    this.getDataEntry()
  }

  changeDepartment(e) {
    const departmentId = this.departmentId = e.departmentId
    this.store.dispatch(ScheduleActions.getSchedules({ departmentId }));
    this.store.dispatch(TemplateActions.getTemplates({ departmentId }));
    this.getDataEntry()
  }
  getDataEntry() {
    if (!this.departmentId || !this.week || !this.year) {
      this.store.dispatch(DataEntryActions.setDataEntriesOnDate({ dataEntries: [] }))
      return;

    }
    const date = this.dateService.getWeekJSON(this.year, this.week);
    this.store.dispatch(DataEntryActions.getDataEntriesOnDate({
      departmentId: this.departmentId,
      fromDate: date.from,
      toDate: date.to
    }))
  }
}
