import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY } from 'rxjs';

import * as DataEntryActions from './data-entry.actions';
import { DataEntryHttpService } from './data-entry-http.service';
import { mergeMap, filter, map } from 'rxjs/operators';


@Injectable()
export class DataEntryEffects {

  addDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.addDataEntry),
    mergeMap(({ dataEntry }) => this.dataEntryHttpService.addDataEntry(dataEntry).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.setCurrentDataEntry({ currentDataEntry: resp.body }))
    )),
    // mergeMap(_ => EMPTY)
  ));

  getLatestDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.getLatestDataEntry),
    mergeMap(({ shiftId }) => this.dataEntryHttpService.getLatestDataEntry(shiftId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.getLatestDataEntrySuccess({ dataEntry: resp.body }))
    )),
    // mergeMap(_ => EMPTY)
  ));

  getDataEntriesOnDate$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.getDataEntriesOnDate),
    mergeMap(({ departmentId, fromDate, toDate }) => this.dataEntryHttpService.getDataEntriesOnDate(departmentId, fromDate, toDate).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.setDataEntriesOnDate({ dataEntries: resp.body }))
    )),
    // mergeMap(_ => EMPTY)
  ));

  updateDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.updateDataEntry),
    mergeMap(({ dataEntry }) => this.dataEntryHttpService.updateDataEntry(dataEntry).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.setCurrentDataEntry({ currentDataEntry: resp.body }))
    )),
    // mergeMap(_ => EMPTY)
  ));

  submitDataEntry$ = createEffect(() => this.actions$.pipe(
    ofType(DataEntryActions.submitDataEntry),
    mergeMap(({ dataEntry }) => this.dataEntryHttpService.submitDataEntry(dataEntry).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DataEntryActions.setCurrentDataEntry({ currentDataEntry: resp.body }))
    )),
    // mergeMap(_ => EMPTY)
  ));


  constructor(
    private actions$: Actions,
    private dataEntryHttpService: DataEntryHttpService
  ) { }

}
