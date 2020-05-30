import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  day: Date

  calendarState: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.day = new Date();
    this.day.setHours(0, 0, 0, 0);
    this.setCalendarState({ day: this.day})
  }

  getCalendarState() {
    return this.calendarState.asObservable();
  }
  setCalendarState(state) {
    this.calendarState.next(state);
  }
}
