import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Schedule } from '@models/*';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-week-grid',
  templateUrl: './week-grid.component.html',
  styleUrls: ['./week-grid.component.scss']
})
export class WeekGridComponent implements OnChanges {
  @Input() schedules: Schedule[];
  @Input() week: number;
  @Input() year: number;
  // @ViewChild('contentCalendar', { read: ElementRef, static: false }) elementView: ElementRef;

  scheduleWeekList;
  startWeekDate = this.dateService.lastMonday();
  // weekNum = this.dateService.getWeekNum()
  daysOfWeek = this.dateService.daysOfWeek;
  hours = new Array(24)


  constructor(
    private dateService: DateService
  ) { }

  ngOnChanges(): void {
    this.startWeekDate = this.dateService.getMonday(this.year, this.week)
    this.scheduleWeekList = this.createScheduleWeekList(this.startWeekDate);
  }
  createScheduleWeekList(startDay: Date) {
    const list = {};
    this.dateService.daysOfWeek.map(({ key, dayNum, name }) => {
      const date = new Date(startDay);
      date.setDate(date.getDate() + dayNum - 1)
      list[dayNum] = {
        name,
        date,
        shifts: [],
      }
      this.schedules.map(schedule => {
        schedule[key] && list[dayNum].shifts.push(schedule);
      })
    });
    return list
  }
  getPos(schedule: Schedule): {} {
    const getMinutes = (time: string) => +time.slice(0, 2) * 60 + +time.slice(3, 5)
    const dayMins = 24 * 60;
    const startTime = getMinutes(schedule.startTime);
    const endTime = getMinutes(schedule.endTime) || dayMins;
    const height = `calc(100% / ${dayMins} * ${endTime - startTime})`
    const top = `calc(100% / ${dayMins} * ${startTime})`
    return {
      height,
      top
    }
  }
}
