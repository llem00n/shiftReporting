import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShiftActions } from '@actions/*';
import { mergeMap, filter, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ShiftHttpService } from './shift-http.service';



@Injectable()
export class ShiftEffects {

  getShifts$ = createEffect(() => this.actions$.pipe(
    ofType(ShiftActions.getShifts),
    mergeMap(action => this.shiftHttpService.getShifts(action.departmentId).pipe(
      filter(resp => !!resp),
      map(resp => ShiftActions.getShiftsSuccess({ shifts: resp.body }))
    )),
  ));

  deleteShift$ = createEffect(() => this.actions$.pipe(
    ofType(ShiftActions.deleteShift),
    mergeMap(action => this.shiftHttpService.deleteShift(action.id).pipe(
      filter(resp => resp && resp.status === 200),
      map(val => ShiftActions.deleteShiftSuccess({ id: action.id }))
    )),
  ))

  updateShift$ = createEffect(() => this.actions$.pipe(
    ofType(ShiftActions.updateShift),
    mergeMap(action => this.shiftHttpService.updateShift(action.shift).pipe(
      filter(resp => !!resp),
      map(resp => ShiftActions.updateShiftSuccess({
        shift: {
          id: resp.body.shiftId,
          changes: resp.body
        }
      }))
    )),
  ));

  addShift$ = createEffect(() => this.actions$.pipe(
    ofType(ShiftActions.addShift),
    mergeMap(action => this.shiftHttpService.addShift(action.shift).pipe(
      filter(resp => !!resp),
      map(resp => ShiftActions.addShiftSuccess({ shift: resp.body }))
    )),
    // mergeMap(_ => EMPTY)
  ));



  constructor(
    private actions$: Actions,
    private shiftHttpService: ShiftHttpService
    ) {}
}
