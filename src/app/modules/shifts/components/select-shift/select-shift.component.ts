import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Shift, State } from '@models/*';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ShiftActions } from '@actions/*';
import { allShifts } from 'src/app/app-store';

@Component({
  selector: 'app-select-shift',
  templateUrl: './select-shift.component.html',
  styleUrls: ['./select-shift.component.scss']
})
export class SelectShiftComponent implements OnInit {
  @Output() changeShift = new EventEmitter<Shift>()
  shift = new FormControl(null);
  shifts: Shift[]
  constructor(
    // private authService: AuthorizationService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(ShiftActions.getShifts())
    this.store.select(allShifts).subscribe(shifts => {
      this.shifts = shifts;
      this.shift.setValue('all');
    });
    this.shift.valueChanges.subscribe(val => {
      let shift = null;
      if (val !== 'all') {
        shift = this.shifts.find(d => d.shiftId == val);
      }
      this.changeShift.emit(shift);
    })
  }
}
