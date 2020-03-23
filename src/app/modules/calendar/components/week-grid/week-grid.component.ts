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

  scheduleWeekList;
  startWeekDate = this.dateService.lastMonday();
  daysOfWeek = this.dateService.daysOfWeek;
  hours = new Array(24)
  shiftBg = [
    // 'bg-gray-400',
    'bg-red-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-teal-400',
    'bg-blue-400',
    'bg-indigo-400',
    'bg-purple-400',
    'bg-pink-400',
  ]

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
    });
    this.schedules.map((schedule: Schedule, index) => {
      const elClass = this.shiftBg[index]
      this.dateService.daysOfWeek.map(({ key, dayNum, name }) => {
        if (!schedule[key]) return;
        if (this.getMinutes(schedule.startTime) < this.getMinutes(schedule.endTime)) {
          const shift = {
            schedule,
            position: this.getPos(schedule)[0],
            elClass
          };
          list[dayNum].shifts.push(shift);
        } else {
          list[dayNum].shifts.push({
            schedule,
            position: this.getPos(schedule)[0],
            elClass
          });

          list[dayNum === 7 ? 1 : dayNum + 1].shifts.push({
            schedule,
            position: this.getPos(schedule)[1],
            elClass
          });

        }
      })
    });
    return list
  }

  getMinutes(time: string): number {
    return +time.slice(0, 2) * 60 + +time.slice(3, 5)
  }

  getPos(schedule: Schedule): {} {
    const dayMins = 24 * 60;
    const startTime = this.getMinutes(schedule.startTime);
    const endTime = this.getMinutes(schedule.endTime) || dayMins;
    const result = []
    if (startTime < endTime) {
      result.push({
        height: `${100 * (endTime - startTime) / dayMins}%`,
        top: `${100 * startTime / dayMins}%`
      })
    } else {
      result.push(
        {
          height: `${100 * (dayMins - startTime) / dayMins}%`,
          top: `${100 * startTime / dayMins}%`
        });
      result.push(
        {
          height: `${100 * endTime / dayMins}%`,
          top: `0`
        });
    }
    return result;

  }
}
