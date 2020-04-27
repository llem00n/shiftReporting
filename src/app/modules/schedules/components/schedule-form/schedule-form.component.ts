import { Component, OnInit, Inject } from '@angular/core';
import { Schedule, DynText, DynTime, DynNumber } from '@models/*';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynDate } from 'src/app/modules/dynamic-controls/components/dyn-date/dyn-date.model';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {
  schedule: Schedule;
  form: FormGroup = new FormGroup({})
  forms: FormGroup[] = [];
  time = [
    new DynTime({ controlId: 'startTime', label: 'Start time', validators: { required: true } }),
    new DynTime({ controlId: 'endTime', label: 'End time', validators: { required: true } }),
  ];
  date = [
    new DynDate({ controlId: 'validFromDate', label: 'Valid from date', validators: { required: true } }),
    new DynDate({ controlId: 'validToDate', label: 'Valid to date', validators: { required: true } }),
  ];
  recurEveryWeeks = [
    new DynNumber({ controlId: 'recurEveryWeeks', label: 'Recur Every Weeks', min: 1, max: 15, step: 1, validators: { required: true } }),
  ]
  daysList = this.dateService.daysOfWeek


  constructor(
    private dateService: DateService,
    public dialogRef: MatDialogRef<ScheduleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { schedule: Schedule, },
  ) { }

  ngOnInit(): void {
    this.schedule = { ...this.data.schedule };
  }

  getForm(e: FormGroup) {
    this.forms.push(e);
    if (this.forms.length !== 3) return;
    this.form = new FormGroup({
      f0: this.forms[0],
      f1: this.forms[1],
      f2: this.forms[2],
    })
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.schedule, value.f0, value.f1, value.f2)
    })
  }
  togleDay(day) {
    this.schedule[day.key] = !this.schedule[day.key];
  }
}
