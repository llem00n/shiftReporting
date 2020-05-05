import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, filter, map, tap } from 'rxjs/operators';
import { ScheduleActions } from '@actions/*';
import { EMPTY } from 'rxjs';
import { ScheduleHttpService } from './schedule-http.service';



@Injectable()
export class ScheduleEffects {

  getSchedules$ = createEffect(() => this.actions$.pipe(
    ofType(ScheduleActions.getSchedules),
    mergeMap(action => this.scheduleHttpService.getSchedules(action.departmentId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => ScheduleActions.getSchedulesSuccess({ schedules: resp.body }))
    )),
    // mergeMap(_ => EMPTY)
  ));

  deleteSchedule$ = createEffect(() => this.actions$.pipe(
    ofType(ScheduleActions.deleteSchedule),
    mergeMap(action => this.scheduleHttpService.deleteSchedule(action.id).pipe(
      filter(resp => resp && resp.status === 200),
      map(val => ScheduleActions.deleteScheduleSuccess({ id: action.id }))
    )),
    // mergeMap(_ => EMPTY)
  ))

  updateSchedule$ = createEffect(() => this.actions$.pipe(
    ofType(ScheduleActions.updateSchedule),
    mergeMap(action => this.scheduleHttpService.updateSchedule(action.schedule).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => ScheduleActions.updateScheduleSuccess({
        schedule: {
          id: resp.body.scheduleId,
          changes: resp.body
        }
      }))
    )),
    // mergeMap(_ => EMPTY)
  ));

  addSchedule$ = createEffect(() => this.actions$.pipe(
    ofType(ScheduleActions.addSchedule),
    mergeMap(action => this.scheduleHttpService.addSchedule(action.schedule).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => ScheduleActions.addScheduleSuccess({ schedule: resp.body }))
    )),
  ));

  constructor(
    private actions$: Actions,
    private scheduleHttpService: ScheduleHttpService
  ) { }
}
