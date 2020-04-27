import { Component, OnInit } from '@angular/core';
import { ScheduleActions } from '@actions/*';
import { Store, select } from '@ngrx/store';
import { State, Schedule } from '@models/*';
import { Subscription } from 'rxjs';
import { allSchedules } from 'src/app/app-store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
  departmentId: number;
  shiftId: number;
  schedules: Schedule[] = [];
  list: Schedule[] = [];
  schedules$: Subscription;
  isAddDisabled = true;
  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit(): void {
    this.schedules$ = this.store.pipe(
      select(allSchedules),
      tap(val => this.schedules = val),
      tap(_ => this.createLIst())
    ).subscribe()
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.schedules$.unsubscribe();
  }

  createLIst() {
    if (this.shiftId) {
      this.list = this.schedules.filter(i => i.shiftId === this.shiftId);
      if (!this.list.length) this.isAddDisabled = false;
      if (this.list.length) this.isAddDisabled = true;
      return;
    }
    this.list = [...this.schedules];
    this.isAddDisabled = true;
  }

  selectDepartment({ departmentId }) {
    this.departmentId = departmentId;
    this.store.dispatch(ScheduleActions.getSchedules({ departmentId }));
  }
  selectShift(e) {
    this.shiftId = null;
    if (e) this.shiftId = e.shiftId;
    this.createLIst();
  }
  addItem() {
    // this.openDialog(<Shift>{})
  }


  edit(id) {
    // const shift = this.shifts.find(i => i.shiftId === id)
    // this.openDialog(shift)
  }
  openDialog(schedule: Schedule) {
    // const dialogRef = this.dialog.open(ShiftFormComponent, { data: { shift } })
    // dialogRef.afterClosed().subscribe(shift => {
    //   if (!shift) return;
    //   if (shift.shiftId) {
    //     this.store.dispatch(ShiftActions.updateShift({ shift }));
    //     return;
    //   }
    //   this.store.dispatch(ShiftActions.addShift({ shift }));
    // });
  }
  delete(id) {
    // this.store.dispatch(ShiftActions.deleteShift({ id }))
  }

}
