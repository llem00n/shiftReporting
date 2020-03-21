import { Injectable } from '@angular/core';

export interface Day {
  key: string;
  name: string;
  threeLetters: string;
  twoLetters: string;
  oneLetter: string;
  dayNum: number
}

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _daysOfWeek: Day[] = [
    { key: 'monday', name: 'Monday', threeLetters: 'Mon', twoLetters: 'MO', oneLetter: 'M', dayNum: 1 },
    { key: 'tuesday', name: 'Tuesday', threeLetters: 'Tue', twoLetters: 'TU', oneLetter: 'T', dayNum: 2 },
    { key: 'wednesday', name: 'Wednesday', threeLetters: 'Wed', twoLetters: 'WE', oneLetter: 'W', dayNum: 3 },
    { key: 'thursday', name: 'Thursday', threeLetters: 'Thu', twoLetters: 'TH', oneLetter: 'U', dayNum: 4 },
    { key: 'friday', name: 'Friday', threeLetters: 'Fri', twoLetters: 'FR', oneLetter: 'F', dayNum: 5 },
    { key: 'saturday', name: 'Saturday', threeLetters: 'Sat', twoLetters: 'SA', oneLetter: 'S', dayNum: 6 },
    { key: 'sunday', name: 'Sunday', threeLetters: 'Sun', twoLetters: 'SU', oneLetter: 'N', dayNum: 7 },
  ]


  constructor() { }

  get daysOfWeek(): Day[] {
    return this._daysOfWeek;
  }

  getDayByNum(dayNum): Day {
    if (dayNum < 1 || dayNum > 7) return null;
    return this._daysOfWeek.find(i => i.dayNum = dayNum);
  }

  // getNumberOfWeek(date: Date) {
  //   const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  //   const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
  //   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  // }

  lastMonday(date?: Date) {
    const d = date ? new Date(date) : new Date();
    d.setHours(0, 0, 0);
    return new Date(d.valueOf() - (d.getDay() - 1) * 24 * 60 * 60 * 1000);
  }

  getWeekNum(date?: Date) {
    const d = date ? new Date(date.valueOf()) : new Date();
    const tdt = new Date(d.valueOf());
    const dayn = (d.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    const firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt.valueOf()) / 604800000);
  }
}
