import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Schedule } from './schedule.model';

export const loadSchedules = createAction(
  '[Schedule/API] Load Schedules', 
  props<{ schedules: Schedule[] }>()
);

export const addSchedule = createAction(
  '[Schedule/API] Add Schedule',
  props<{ schedule: Schedule }>()
);

export const upsertSchedule = createAction(
  '[Schedule/API] Upsert Schedule',
  props<{ schedule: Schedule }>()
);

export const addSchedules = createAction(
  '[Schedule/API] Add Schedules',
  props<{ schedules: Schedule[] }>()
);

export const upsertSchedules = createAction(
  '[Schedule/API] Upsert Schedules',
  props<{ schedules: Schedule[] }>()
);

export const updateSchedule = createAction(
  '[Schedule/API] Update Schedule',
  props<{ schedule: Update<Schedule> }>()
);

export const updateSchedules = createAction(
  '[Schedule/API] Update Schedules',
  props<{ schedules: Update<Schedule>[] }>()
);

export const deleteSchedule = createAction(
  '[Schedule/API] Delete Schedule',
  props<{ id: string }>()
);

export const deleteSchedules = createAction(
  '[Schedule/API] Delete Schedules',
  props<{ ids: string[] }>()
);

export const clearSchedules = createAction(
  '[Schedule/API] Clear Schedules'
);
