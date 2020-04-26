import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shift } from '@models/*';

@Component({
  selector: 'app-shift-card',
  templateUrl: './shift-card.component.html',
  styleUrls: ['./shift-card.component.scss']
})
export class ShiftCardComponent{
  @Input() shift: Shift;
  @Output() clickEdit = new EventEmitter<number>()
  @Output() clickDelete = new EventEmitter<number>()

  delete() {
    this.clickDelete.emit(this.shift.shiftId)
  }
  edit() {
    this.clickEdit.emit(this.shift.shiftId)
  }

}
