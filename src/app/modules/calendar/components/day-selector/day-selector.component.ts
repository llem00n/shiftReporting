import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss']
})
export class DaySelectorComponent implements OnInit {
  @Input() day: Date;
  @Output() changeDay = new EventEmitter<Date>()
  // controlDay = new FormControl('')
  // weekStr: string;
  constructor(
    // private dateService: DateService
  ) {

  }
  ngOnInit() {
    // this.controlDay.setValue(this.day.toISOString());
    // this.controlDay.valueChanges.subscribe(console.log)
    // console.log(this.controlDay);

  }
  // ngOnChanges(): void {
  // this.weekStr = this.dateService.getWeekString(this.year, this.week);
  // }
  dateChange(a, e) {
    console.log(a, e.value);
    this.changeDay.emit(e.value)

  }
  nextDay() {
    const day = new Date(this.day)
    day.setHours(0, 0, 0, 0);
    day.setDate(this.day.getDate() + 1)
    this.changeDay.emit(day)
  }

  prevDay() {
    const day = new Date(this.day)
    day.setHours(0, 0, 0, 0);
    day.setDate(this.day.getDate() - 1)
    console.log(day);

    this.changeDay.emit(day)
  }
}
