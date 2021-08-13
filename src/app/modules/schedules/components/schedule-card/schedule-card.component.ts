import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Schedule } from '@models/*';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent {
  @Input() schedule: Schedule
  @Output() clickEdit = new EventEmitter<number>()
  @Output() clickDelete = new EventEmitter<number>()


  constructor(
    private dateService: DateService
  ) { }

  daysList = this.dateService.daysOfWeek

  get validFromDate() {
    return new Date(this.schedule.validFromDate).toLocaleDateString()
  }
  get validToDate() {
    return new Date(this.schedule.validToDate).toLocaleDateString()
  }
  get startTime(){    
    return this.dateService.getLocalTime(this.schedule.startTime)
  }
  get endTime(){
    return this.dateService.getLocalTime(this.schedule.endTime)
  }
  delete() {
    this.clickDelete.emit(this.schedule.scheduleId)
  }
  edit() {
    this.clickEdit.emit(this.schedule.scheduleId)
  }
}