import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { Schedule, State } from '@models/*';
import { DateService } from 'src/app/services/date/date.service';
import { Store, select } from '@ngrx/store';
import { configurations } from 'src/app/app-store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-week-grid',
  templateUrl: './week-grid.component.html',
  styleUrls: ['./week-grid.component.scss']
})
export class WeekGridComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @Input() schedules: Schedule[];
  @Input() week: number;
  @Input() year: number;
  @Input() day: Date;
  @ViewChild('calendarContent') calendarContent: ElementRef;
  // currentShiftStyle: string = " shadow-outline z-10";

  scheduleWeekList;
  startWeekDate = this.dateService.lastMonday();
  daysOfWeek = this.dateService.daysOfWeek;
  hours = new Array(24);
  interval;
  calendarContentHeight: number;
  submitReportOffset

  shiftStyle = ['blue', 'green', 'indigo', 'orange', 'teal', 'red', 'purple', 'pink', 'teal', 'yellow', 'gray'].map(i => `text-${i}-500 border-${i}-300`);

  constructor(
    private dateService: DateService,
    private store: Store<State>
  ) { }
  ngAfterViewChecked(): void {
    this.setTemplateNum()
  }

  ngOnInit() {
    this.store.pipe(select(configurations)).pipe(
      tap(config => this.submitReportOffset = <number>config.find(c => c.configurationId === 2)?.value || 0),
      tap(_ => this.createScheduleWeekList(this.startWeekDate, this.day)),
    ).subscribe()

    this.interval = setInterval(() => {
      this.scheduleWeekList && Object.keys(this.scheduleWeekList).map(key => {
        this.scheduleWeekList[key].shifts.map(shift => {
          shift['isActive'] = this.getClass(shift)
        })
      })
    }, 1000)
  }

  ngOnChanges(): void {
    this.startWeekDate = this.dateService.getMonday(this.year, this.week)
    this.scheduleWeekList = this.createScheduleWeekList(this.startWeekDate, this.day);
    this.setTemplateNum(true);

  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  setTemplateNum(necessarily?: boolean) {
    if (!this.calendarContent) return;
    const height = this.calendarContent.nativeElement.offsetHeight;
    if ((height !== this.calendarContentHeight || necessarily) && !this.shiftInfo) {
      Object.keys(this.scheduleWeekList).map(key => {
        this.scheduleWeekList[key].shifts.map(shift => {
          shift['templNum'] = (height * shift.position.height.slice(0, -1) / 100 - 27.395) / 34.165 >> 0;
          this.calendarContentHeight = height;
        })
      })
    }
  }

  getShiftDates(day, schedule): { startDate: Date, endDate: Date, deadLine: Date } {
    const startDate = new Date(this.dateService.dateLocalJSON(day.date).slice(0, 11) + schedule.startTime);
    const endDate = new Date(this.dateService.dateLocalJSON(day.date).slice(0, 11) + schedule.endTime);
    if (startDate > endDate) endDate.setDate(endDate.getDate() + 1);
    const deadLine = new Date(endDate.getTime() + this.submitReportOffset * 60000);
    return { startDate, endDate, deadLine };
  }
  getClass(shift) {
    return this.dateService.isBetween(new Date(), shift.shiftDates.startDate, shift.shiftDates.endDate);
  }

  createScheduleWeekList(startDay: Date, day?: Date) {
    const list = {};
    if (day) {
      const dayNum = day.getDay() || 7
      list[dayNum] = {
        date: day,
        name: this.dateService.daysOfWeek.find(d => d.dayNum === dayNum).name,
        key: this.dateService.daysOfWeek.find(d => d.dayNum === dayNum).key,
        shifts: [],
      }
    } else {
      this.dateService.daysOfWeek.map(({ key, dayNum, name }) => {
        const date = new Date(startDay);
        date.setDate(date.getDate() + dayNum - 1)
        list[dayNum] = {
          key: this.dateService.daysOfWeek.find(d => d.dayNum === dayNum).key,
          name,
          date,
          shifts: [],
        }
      });
    }

    this.schedules.map((schedule: Schedule, index) => {
      const elClass = this.shiftStyle[index % 10]
      Object.keys(list).map(k => {
        const shiftDates = this.getShiftDates(list[k], schedule)
        const dayNum = +k;
        const { key } = list[dayNum]
        let weeks = this.dateService.getWeeks(list[dayNum].date, schedule.validFromDate);
        if (!this.getMinutes(schedule.endTime) || this.getMinutes(schedule.startTime) < this.getMinutes(schedule.endTime)) {
          if (!schedule[key]) return;
          if (!this.dateService.isBetween(list[dayNum].date, schedule.validFromDate, schedule.validToDate)) return;
          if (weeks % schedule.recurEveryWeeks) return;
          list[dayNum].shifts.push({
            shiftDates,
            schedule,
            position: this.getPos(schedule)[0],
            elClass,
          });
          return;
        }
        if (schedule[key]
          && this.dateService.isBetween(list[dayNum].date, schedule.validFromDate, schedule.validToDate)
          && !(weeks % schedule.recurEveryWeeks)) {
          list[dayNum].shifts.push({
            shiftDates,
            part: 1,
            schedule,
            position: this.getPos(schedule)[0],
            elClass
          });
        };
        const prevDate = new Date(list[dayNum].date);
        prevDate.setDate(prevDate.getDate() - 1);
        const prevDateKey = this.daysOfWeek.find(d => d.dayNum === (prevDate.getDay() || 7)).key;
        weeks = this.dateService.getWeeks(prevDate, schedule.validFromDate);
        if (schedule[prevDateKey]
          && this.dateService.isBetween(prevDate, schedule.validFromDate, schedule.validToDate)
          && !(weeks % schedule.recurEveryWeeks)) {
          const prevDay = (date: Date) => {
            const resDate = new Date(date)
            resDate.setDate(resDate.getDate() - 1)
            return resDate;
          };
          const startDate = prevDay(shiftDates.startDate)
          const endDate = prevDay(shiftDates.endDate)
          const deadLine = prevDay(shiftDates.deadLine)
          list[dayNum].shifts.push({
            shiftDates: { startDate, endDate, deadLine },
            part: 2,
            schedule,
            position: this.getPos(schedule)[1],
            elClass
          });
        };
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
    shift.expanded = true;
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
    shift.expanded = false;
    shift.position.top = this.shiftInfo.position.top;
    shift.position.height = this.shiftInfo.position.height;
    shift.templNum = this.shiftInfo.templNum;
    this.calendarContentHeight = this.calendarContentHeight - 1;
    this.shiftInfo = null
  }
}
