import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, filter, map, mergeMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as ChecklistActions from './checklist.actions';
import { ChecklistHttpService } from './checklist-http.service';


@Injectable()
export class ChecklistEffects {

  getChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistActions.getChecklist),
    mergeMap(({ scheduleId }) => this.checklistHttpService.getChecklist(scheduleId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => ChecklistActions.setCurrentChecklist({items: resp.body}))
    ))
  ))

  updateChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistActions.updateChecklist),
    mergeMap(({items, scheduleId}) => this.checklistHttpService.updateChecklist(items, scheduleId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => ChecklistActions.setCurrentChecklist({items: []}))
    ))
  ))

  getDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistActions.getDataEntry),
    mergeMap(({scheduleId, userId, date}) => this.checklistHttpService.getDataEntry(scheduleId, userId, date).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => ChecklistActions.setCurrentDataEntry({dataEntry: resp.body}))
    ))
  ))

  updateDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(ChecklistActions.updateDataEntry),
    mergeMap(({dataEntry}) => this.checklistHttpService.updateDataEntry(dataEntry).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => ChecklistActions.setCurrentDataEntry({dataEntry: null}))
    ))
  ))

  constructor(
    private actions$: Actions,
    private checklistHttpService: ChecklistHttpService
  ) { }
}
