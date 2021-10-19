import { createEffect } from '@ngrx/effects';
import { createAction, props } from '@ngrx/store';
import { ChecklistItem } from './checklist-item.model';
import { ChecklistDataEntry } from './data-entry.model';
import { Properties } from './properties';

export const getChecklist = createAction(
  '[Checklist] Get Checklist',
  props<{ scheduleId: number }>()
);

export const setCurrentChecklist = createAction(
  '[Checklist] Set Checklist',
  props<{ items: ChecklistItem[] }>()
)

export const setCurrentScheduleId = createAction(
  '[Checklist] Set Current Schedule ID',
  props<{ scheduleId: number }>()
)

export const updateChecklist = createAction(
  '[Chicklist] Update Checklist',
  props<{ items: ChecklistItem[], scheduleId: number }>()
)

export const getDataEntry = createAction(
  '[Checklist] Get Data Entry',
  props<{ scheduleId: number, userId: string, date: Date }>()
)

export const setCurrentDataEntry = createAction(
  '[Checklist] Set Current Data Entry',
  props<{ dataEntry: ChecklistDataEntry }>()
)

export const updateDataEntry = createAction(
  '[Checklist] Update Data Entry',
  props<{ dataEntry: ChecklistDataEntry }>()
)

export const setProperties = createAction(
  '[Checklist] Set Properties',
  props<{ properties: Properties }>()
)
