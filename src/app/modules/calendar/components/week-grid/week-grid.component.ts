import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { Schedule } from '@models/*';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-week-grid',
  templateUrl: './week-grid.component.html',
  styleUrls: ['./week-grid.component.scss']
})
export class WeekGridComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @Input() schedules: Schedule[];
  @Input() week: number;
  @Input() year: number;

  @ViewChild('calendarContent') calendarContent: ElementRef;
  // currentShiftStyle: string = " shadow-outline z-10";

  scheduleWeekList;
  startWeekDate = this.dateService.lastMonday();
  daysOfWeek = this.dateService.daysOfWeek;
  hours = new Array(24);
  interval;
  calendarContentHeight: number;

  shiftStyle = ['red', 'orange', 'green', 'blue', 'indigo', 'purple', 'pink', 'teal', 'yellow', 'gray']
    .map(i => `text-${i}-500 border-${i}-400`);

  constructor(
    private dateService: DateService
  ) { }
  ngAfterViewChecked(): void {
    const height = this.calendarContent.nativeElement.offsetHeight;
    if (height !== this.calendarContentHeight && !this.shiftInfo) {
      Object.keys(this.scheduleWeekList).map(key => {
        this.scheduleWeekList[key].shifts.map(shift => {
          shift['templNum'] = (height * shift.position.height.slice(0, -1) / 100 - 27.395) / 34.165 >> 0;
          this.calendarContentHeight = height;
        })
      })
    }
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.scheduleWeekList && Object.keys(this.scheduleWeekList).map(key => {
        this.scheduleWeekList[key].shifts.map(shift => {
          shift['isActive'] = this.getClass(this.scheduleWeekList[key], shift)
        })
      })
    }, 1000)
  }

  ngOnChanges(): void {
    this.startWeekDate = this.dateService.getMonday(this.year, this.week)
    this.scheduleWeekList = this.createScheduleWeekList(this.startWeekDate);
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getClass(day, shift) {
    let result = false;
    let startDate = new Date(this.dateService.dateLocalJSON(day.date).slice(0, 11) + shift.schedule.startTime);
    let endDate = new Date(this.dateService.dateLocalJSON(day.date).slice(0, 11) + shift.schedule.endTime);
    if (shift.part === 1) endDate = new Date(endDate.setDate(endDate.getDate() + 1));
    if (shift.part === 2) startDate = new Date(startDate.setDate(endDate.getDate() - 1));
    if (this.dateService.isBetween(new Date(), startDate, endDate)) result = true
    return result;
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
      const elClass = this.shiftStyle[index % 10]
      this.dateService.daysOfWeek.map(({ key, dayNum }) => {
        if (
          !schedule[key]
          || !this.dateService.isBetween(list[dayNum].date, schedule.validFromDate, schedule.validToDate)
        ) return;
        const weeks = this.dateService.getWeeks(list[dayNum].date, schedule.validFromDate);
        if (!this.getMinutes(schedule.endTime) || this.getMinutes(schedule.startTime) < this.getMinutes(schedule.endTime)) {
          if (weeks % schedule.recurEveryWeeks) return;
          list[dayNum].shifts.push({
            schedule,
            position: this.getPos(schedule)[0],
            elClass,
          });
          return;
        }
        if (weeks % schedule.recurEveryWeeks) {
          if (((weeks - 1) % schedule.recurEveryWeeks) || dayNum === 7) return;
          list[1].shifts.push({
            part: 2,
            schedule,
            position: this.getPos(schedule)[1],
            elClass
          });
          return;
        };
        list[dayNum].shifts.push({
          part: 1,
          schedule,
          position: this.getPos(schedule)[0],
          elClass
        });
        if (dayNum === 7) return;
        list[dayNum + 1].shifts.push({
          part: 2,
          schedule,
          position: this.getPos(schedule)[1],
          elClass
        });
      })
    });
    return list
  }

  getMinutes(time: string): number {
    return +time.slice(0, 2) * 60 + +time.slice(3, 5)
  }
  getTtemplNum() {

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
  shiftInfo = null;
  clickShowMore(e, shift) {
    this.shiftInfo = {};
    this.shiftInfo.position = { ...shift.position };
    this.shiftInfo.templNum = shift.templNum;
    const height = (27.395 + 4 + 34.165 * e.templLength) / this.calendarContentHeight * 100;
    shift.position.height = height > 100 ? '100%' : height + '%';
    if (height > 100) {
      shift.position.top = 0 + '%';
    } else if (height > (100 - shift.position.top.slice(0, -1))) shift.position.top = 100 - height + '%';
    shift.templNum = e.templLength;
    this.calendarContentHeight = this.calendarContentHeight + 1;
  }
  mouseOut(e: MouseEvent, shift) {
    if (e.target['id'] !== 'shift' || !this.shiftInfo) return;
    shift.position.top = this.shiftInfo.position.top;
    shift.position.height = this.shiftInfo.position.height;
    shift.templNum = this.shiftInfo.templNum;
    this.calendarContentHeight = this.calendarContentHeight - 1;
    this.shiftInfo = null
  }
}
