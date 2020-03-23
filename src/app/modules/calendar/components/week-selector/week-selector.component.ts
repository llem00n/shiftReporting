import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.scss']
})
export class WeekSelectorComponent implements OnChanges {
  @Input() week: number;
  @Input() year: number;
  @Output() changeWeek = new EventEmitter<{}>()

  weekStr: string;
  constructor(
    private dateService: DateService
  ) {

  }

  ngOnChanges(): void {
    this.weekStr = this.dateService.getWeekString(this.year, this.week);
  }

  nextWeek() {    
    const week = this.dateService.nextWeek(this.year, this.week);
    console.log(this.dateService.nextWeek(2020, 43));
    
    this.changeWeek.emit(week)    
  }

  prevWeek() {
    const week = this.dateService.prevWeek(this.year, this.week);
    this.changeWeek.emit(week)
  }
}
