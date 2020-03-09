import { Component, OnInit } from '@angular/core';
import { DynTime } from '../dynamic-controls/components/dyn-time/dyn-time.model';
import { DynNumber } from '../dynamic-controls/components/dyn-number/dyn-number.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Schedule, State } from 'src/app/app-store/models';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { editingSchedule } from 'src/app/app-store';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DynText } from '../dynamic-controls/components/dyn-text/dyn-text.model';
import { DynTextarea } from '../dynamic-controls/components/dyn-textarea/dyn-textarea.model';
import { ScheduleActions } from '@actions/*';

const daysOfWeek = [
  { key: 'monday', name: 'Monday', threeLetters: 'Mon', twoLetters: 'MO', oneLetter: 'M' },
  { key: 'tuesday', name: 'Tuesday', threeLetters: 'Tue', twoLetters: 'TU', oneLetter: 'T' },
  { key: 'wednesday', name: 'Wednesday', threeLetters: 'Wed', twoLetters: 'WE', oneLetter: 'W' },
  { key: 'thursday', name: 'Thursday', threeLetters: 'Thu', twoLetters: 'TH', oneLetter: 'U' },
  { key: 'friday', name: 'Friday', threeLetters: 'Fri', twoLetters: 'FR', oneLetter: 'F' },
  { key: 'saturday', name: 'Saturday', threeLetters: 'Sat', twoLetters: 'SA', oneLetter: 'S' },
  { key: 'sunday', name: 'Sunday', threeLetters: 'Sun', twoLetters: 'SU', oneLetter: 'N' },]

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  daysOfWeek = daysOfWeek;
  schedule: Schedule;
  title: string = 'Create schedule';
  saveButton: string = 'Add';

  shiftControls = [
    new DynText({ controlId: 'shiftName', label: 'Shift name', readonly: true }),
    new DynTextarea({ controlId: 'shiftDescription', label: 'Shift description', readonly: true }),

  ]
  generalConfig = [
    new DynTime({ controlId: 'startTime', label: 'Start time', validators: { required: true } }),
    new DynTime({ controlId: 'endTime', label: 'End time', validators: { required: true } }),
    new DynNumber({ controlId: 'recurEveryWeeks', label: 'Recur Every Weeks', min: 1, max: 15, step: 1, validators: { required: true } }),
  ];
  daysFormInit() {

    const group: FormGroup = new FormGroup({});
    daysOfWeek.map(i => {
      group.addControl(i.key, new FormControl(false));
    })
    return group;
  }

  form: FormGroup;

  constructor(
    private location: Location,
    private store: Store<State>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.pipe(
      select(editingSchedule),
      take(1),
    ).subscribe(schedule => {
      if (!schedule) {
        this.router.navigate(['/configuration']);
        return;
      }
      this.schedule = new Schedule(schedule)
      if (schedule.scheduleId) {
        this.title = 'Edit schedule';
        this.saveButton = 'Save'
      };
    })
  }


  goBack() {
    this.location.back()
  }


  getForm(e) {
    this.form = e;
    daysOfWeek.map(i => {
      this.form.addControl(i.key, new FormControl(this.schedule[i.key]));
    })
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.schedule, value);
    })
  }
  togleDay(day) {
    const controlDay = this.form.get(day.key);
    controlDay.setValue(!this.form.value[day.key]);
  }
  save() {
    if (this.schedule.scheduleId) {
      this.store.dispatch(ScheduleActions.updateSchedule({ schedule: this.schedule }))
    } else {
      delete this.schedule.scheduleId;
      this.store.dispatch(ScheduleActions.addSchedule({ schedule: this.schedule }))
    }
  }

  getDayStyle(day): string {
    return this.form.value[day.key]
      ? 'text-gray-100 bg-blue-600'
      : 'text-gray-500 bg-gray-100'
  }
}
