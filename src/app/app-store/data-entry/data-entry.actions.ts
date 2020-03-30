import { createAction, props } from '@ngrx/store';
import { DataEntry } from '../models';

export const addDataEntry = createAction(
  '[DataEntry] Add DataEntry',
  props<{ dataEntry: DataEntry }>()
);
export const addDataEntrySuccess = createAction(
  '[DataEntry] Add DataEntry Success',
  props<{ dataEntry: DataEntry }>()
);

export const getLatestDataEntry = createAction(
  '[DataEntry] Get Latest DataEntry',
  props<{ shiftId: number }>()
);
export const getLatestDataEntrySuccess = createAction(
  '[DataEntry] Get Latest DataEntrys Success',
  props<{ dataEntry: DataEntry }>()
);

export const getDataEntriesOnDate = createAction(
  '[DataEntry] Get DataEntries OnDate',
  props<{ departmentId: number, fromDate: string, toDate: string }>()
);
export const setDataEntriesOnDate = createAction(
  '[DataEntry] Set DataEntries OnDate',
  props<{ dataEntries: DataEntry[] }>()
);

export const updateDataEntry = createAction(
  '[DataEntry] Update DataEntry',
  props<{ dataEntry: DataEntry }>()
);
export const updateDataEntrySuccess = createAction(
  '[DataEntry] Update DataEntry Success',
  props<{ dataEntry: DataEntry }>()
);

export const submitDataEntry = createAction(
  '[DataEntry] Submit DataEntry',
  props<{ dataEntry: DataEntry }>()
);
export const submitDataEntrySuccess = createAction(
  '[DataEntry] Submit DataEntry Success',
  props<{ dataEntry: DataEntry }>()
);

export const setCurrentDataEntry = createAction(
  '[DataEntry] Set CurrentDataEntry',
  props<{ dataEntry: DataEntry }>()
);