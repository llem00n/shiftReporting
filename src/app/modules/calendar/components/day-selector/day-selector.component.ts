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
  }
  dateChange(a, e) {
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
    this.changeDay.emit(day)
  }
}
