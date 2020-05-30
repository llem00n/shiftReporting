import { Action, createReducer, on } from '@ngrx/store';
import * as DataEntryActions from './data-entry.actions';
import { DataEntry, CurrentDataEntry, DataEntryLog } from './data-entry.model';

export const dataEntryFeatureKey = 'dataEntry';

export interface State {
  currentDataEntry: CurrentDataEntry,
  latestDataEntry: DataEntry,
  dataEntriesOnDate: DataEntry[],
  dataEntryLogs: DataEntryLog[],
}

export const initialState: State = {
  currentDataEntry: null,
  latestDataEntry: null,
  dataEntriesOnDate: [],
  dataEntryLogs: [],
};

const dataEntryReducer = createReducer(
  initialState,

  on(DataEntryActions.getLatestDataEntrySuccess,
    (state, { dataEntry }) => ({ ...state, latestDataEntry: dataEntry })),

  on(DataEntryActions.setDataEntriesOnDate,
    (state, { dataEntries }) => ({ ...state, dataEntriesOnDate: dataEntries })),

  on(DataEntryActions.setCurrentDataEntry,
    (state, { currentDataEntry }) => ({ ...state, currentDataEntry })),

  on(DataEntryActions.getDataEntryLogsSuccess,
    (state, { dataEntryLogs }) => ({ ...state, dataEntryLogs })),
);

export function reducer(state: State | undefined, action: Action) {
  return dataEntryReducer(state, action);
}
