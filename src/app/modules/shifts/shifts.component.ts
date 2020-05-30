import { Component, OnInit } from '@angular/core';
import { Shift, State } from '@models/*';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { allShifts } from 'src/app/app-store';
import { ShiftActions } from '@actions/*';
import { ShiftFormComponent } from './components/shift-form/shift-form.component';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {
  shifts: Shift[] = [];
  filterShifts: Shift[];
  search = new FormControl('')

  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
  ) { }


  ngOnInit() {
    this.getShifts();
    this.search.valueChanges.subscribe(str => this.setFilterShifts(str))
  }

  setFilterShifts(string?: string) {
    if (!string) {
      this.filterShifts = [...this.shifts];
      return;
    }
    const str = string.toLowerCase()
    this.filterShifts = this.shifts.filter(i => (
      i.name.toLowerCase().includes(str)
      // || i.code.toLowerCase().includes(str)
      // || i.address.toLowerCase().includes(str)
    ))
  }
  getShifts() {
    let respCount = 0;
    this.store.pipe(
      select(allShifts),
    ).subscribe((shifts: Shift[]) => {
      if (shifts.length === 0 && respCount === 0) {
        ++respCount;
        this.store.dispatch(ShiftActions.getShifts());
        return
      };
      this.shifts = shifts;
      this.filterShifts = shifts;
      this.search.setValue('')
    })
  }
  addItem() {
    this.openDialog(<Shift>{})
  }
  edit(id) {
    const shift = this.shifts.find(i => i.shiftId === id)
    this.openDialog(shift)
  }
  openDialog(shift: Shift) {
    const dialogRef = this.dialog.open(ShiftFormComponent, { data: { shift } })
    dialogRef.afterClosed().subscribe(shift => {
      if (!shift) return;
      if (shift.shiftId) {
        this.store.dispatch(ShiftActions.updateShift({ shift }));
        return;
      }
      this.store.dispatch(ShiftActions.addShift({ shift }));
    });
  }
  delete(id) {
    this.store.dispatch(ShiftActions.deleteShift({ id }))
  }
}
