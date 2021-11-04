import { Action, createReducer, on } from '@ngrx/store';
import { ChecklistItem } from './checklist-item.model';
import * as ChecklistActions from './checklist.actions';
import { ChecklistDataEntry } from './data-entry.model';
import { Properties } from './properties';

export const checklistFeatureKey = 'checklist';

export interface State {
  currentChecklistItems: ChecklistItem[];
  scheduleId: number;
  dataEntry: ChecklistDataEntry;
  properties: Properties;
}

export const initialState: State = {
  currentChecklistItems: [],
  scheduleId: 0,
  dataEntry: null,
  properties: null,
};


export const reducer = createReducer(
  initialState,

  on(ChecklistActions.setCurrentChecklist,
    (state, { items }) => ({ ...state, currentChecklistItems: items })),

  on(ChecklistActions.setCurrentScheduleId,
    (state, { scheduleId }) => ({ ...state, scheduleId: scheduleId })),

  on(ChecklistActions.setCurrentDataEntry,
    (state, { dataEntry }) => ({ ...state, dataEntry: dataEntry })),

  on(ChecklistActions.setProperties,
      (state, { properties }) => ({ ...state, properties: properties })),
);

