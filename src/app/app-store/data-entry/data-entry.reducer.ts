import { Action, createReducer, on } from '@ngrx/store';
import * as DataEntryActions from './data-entry.actions';
import { DataEntry } from './data-entry.model';

export const dataEntryFeatureKey = 'dataEntry';

export interface State {
  latestDataEntry: DataEntry,
  dataEntriesOnDate: DataEntry[],
}

export const initialState: State = {
  latestDataEntry: null,
  dataEntriesOnDate: null,
};

const dataEntryReducer = createReducer(
  initialState,

  on(DataEntryActions.getLatestDataEntrySuccess,
    (state, { dataEntry }) => ({ ...state, latestDataEntry: dataEntry })),

  on(DataEntryActions.getDataEntriesOnDateSuccess,
    (state, { dataEntries }) => ({ ...state, dataEntriesOnDate: dataEntries })),

);

export function reducer(state: State | undefined, action: Action) {
  return dataEntryReducer(state, action);
}
