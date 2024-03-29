import { Component, OnInit } from '@angular/core';
import { DynTime } from '../dynamic-controls/components/dyn-time/dyn-time.model';
import { DynNumber } from '../dynamic-controls/components/dyn-number/dyn-number.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Schedule } from 'src/app/app-store/models';
import { Router } from '@angular/router';
import { DynText } from '../dynamic-controls/components/dyn-text/dyn-text.model';
import { DynTextarea } from '../dynamic-controls/components/dyn-textarea/dyn-textarea.model';
import { DialogService } from '../dialog/dialog.service';
import { DateService } from 'src/app/services/date/date.service';
import { DynDate } from '../dynamic-controls/components/dyn-date/dyn-date.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  daysOfWeek = this.dateService.daysOfWeek;
  schedule: Schedule;
  title: string = 'Create schedule';
  saveButton: string = 'Add';
  form: FormGroup;

  shiftControls = [
    new DynText({ controlId: 'shiftName', label: 'Shift name', readonly: true }),
    new DynTextarea({ controlId: 'shiftDescription', label: 'Shift description', readonly: true }),

  ]
  generalConfig = [
    new DynDate({ controlId: 'validFromDate', label: 'Valid from date', validators: { required: true } }),
    new DynDate({ controlId: 'validToDate', label: 'Valid to date', validators: { required: true } }),
    new DynTime({ controlId: 'startTime', label: 'Start time', validators: { required: true } }),
    new DynTime({ controlId: 'endTime', label: 'End time', validators: { required: true } }),
    new DynNumber({ controlId: 'recurEveryWeeks', label: 'Recur Every Weeks', min: 1, max: 15, step: 1, validators: { required: true } }),
  ];

  constructor(
    private router: Router,
    private dialog: DialogService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.schedule = new Schedule(this.dialog.getData())
    if (this.schedule.scheduleId) {
      this.title = 'Edit schedule';
      this.saveButton = 'Save'
    };
  }

  daysFormInit() {
    const group: FormGroup = new FormGroup({});
    this.daysOfWeek.map(i => {
      group.addControl(i.key, new FormControl(false));
    })
    return group;
  }

  getForm(e) {
    this.form = e;
    this.daysOfWeek.map(i => {
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
    this.dialog.close(this.schedule)
  }

  getDayStyle(day): string {
    return this.form.value[day.key]
      ? 'text-gray-100 bg-blue-600'
      : 'text-gray-500 bg-gray-100'
  }

  close() {
    this.dialog.dismiss()
  }
}
