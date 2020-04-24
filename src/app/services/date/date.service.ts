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

  private day_ms = 24 * 60 * 60 * 1000;

  constructor() { }

  get daysOfWeek(): Day[] {
    return this._daysOfWeek;
  }

  getDayByNum(dayNum): Day {
    if (dayNum < 1 || dayNum > 7) return null;
    return this._daysOfWeek.find(i => i.dayNum = dayNum);
  }

  lastMonday(date?: Date): Date {
    const d = date ? new Date(date) : new Date();
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() - ((d.getDay() || 7) - 1));
    return d;
  }

  getMonday(year: number, week: number): Date {
    const date = new Date(year, 0, 4);
    let monday = this.lastMonday(new Date(date.valueOf() + (week - 1) * 7 * this.day_ms));
    return monday;
  }

  getWeek(date?: Date): { year: number, week: number } {
    const d = date ? new Date(date.valueOf()) : new Date();
    const tdt = new Date(d.valueOf());
    const dayn = (d.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    const firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    const week = 1 + Math.ceil((firstThursday - tdt.valueOf()) / 604800000);
    const monday = this.lastMonday(d)
    let year = monday.getFullYear();
    week === 1 && monday.getDate() > 27 && ++year
    return { week, year };
  }

  getWeekString(year: number, week: number): string {
    const monday = this.getMonday(year, week).toDateString();
    const sunday = new Date(new Date(monday).valueOf() + 6 * this.day_ms).toDateString()
    const result = `
    ${monday.slice(4, 10)} 
    ${monday.slice(11) !== sunday.slice(11) ? monday.slice(11) : ''} - 
    ${monday.slice(4, 7) !== sunday.slice(4, 7) ? sunday.slice(4, 7) : ''}
    ${sunday.slice(8, 10)}, 
    ${sunday.slice(11)}`
    return result;
  }

  nextWeek(year, week): { year: number, week: number } {
    return this.getWeek(new Date(this.getMonday(year, week).valueOf() + 8 * this.day_ms));
  }
  prevWeek(year, week): { year: number, week: number } {
    return this.getWeek(new Date(this.getMonday(year, week).valueOf() - 1 * this.day_ms));
  }

  dateLocalJSON(date: Date): string {
    return new Date(date.valueOf() - date.getTimezoneOffset() * 60 * 1000).toJSON().slice(0, 23);
  }

  getWeekJSON(year: number, week: number): { from: string, to: string } {
    const result = {
      from: this.dateLocalJSON(new Date(this.getMonday(year, week).valueOf() - this.day_ms)),
      to: this.dateLocalJSON(new Date(this.getMonday(year, week).valueOf() + 8 * this.day_ms)),
    }
    return result
  }

  getLocalDate(date?): string {
    const curternDateUTC = date ? new Date(date) : new Date()
    return new Date(curternDateUTC.valueOf() - curternDateUTC.getTimezoneOffset() * 1000 * 60).toJSON().slice(0, -1);
  }

  isBetween(date, start, end): boolean {
    const d = new Date(date).valueOf();
    const s = new Date(start).valueOf();
    const e = new Date(end).valueOf();
    return (d >= s) && (d <= e) ? true : false;
  }

  getWeeks(date: Date | string, from: Date | string): number {
    const d = new Date(date);
    const f = new Date(from);
    return Math.round((this.lastMonday(d).valueOf() - this.lastMonday(f).valueOf()) / (this.day_ms)) / 7
  }
}
