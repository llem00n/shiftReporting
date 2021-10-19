import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Schedule } from '@models/*';
@Component({
  selector: 'app-schedules-list',
  templateUrl: './schedules-list.component.html',
  styleUrls: ['./schedules-list.component.scss']
})
export class SchedulesListComponent implements OnInit {
  @Input() schedules: Schedule[];
  @Input() checkedSchedules: number[];
  @Output() onCheck = new EventEmitter<number>();
  @Output() onUncheck = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(e: any, scheduleId: number) {
    if (e.checked)
      this.onCheck.emit(scheduleId);
    else 
      this.onUncheck.emit(scheduleId);
  }
}
