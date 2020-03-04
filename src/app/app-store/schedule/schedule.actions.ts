import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Schedule } from './schedule.model';

export const getSchedules = createAction(
  '[Schedule/API] Get Schedules',
  props<{ departmentId: number }>()
);
export const getSchedulesSuccess = createAction(
  '[Schedule/API] Get Schedules Success',
  props<{ schedules: Schedule[] }>()
);

export const addSchedule = createAction(
  '[Schedule/API] Add Schedule',
  props<{ schedule: Schedule }>()
);
export const addScheduleSuccess = createAction(
  '[Schedule/API] Add Schedule Success',
  props<{ schedule: Schedule }>()
);

// export const upsertSchedule = createAction(
//   '[Schedule/API] Upsert Schedule',
//   props<{ schedule: Schedule }>()
// );

// export const addSchedules = createAction(
//   '[Schedule/API] Add Schedules',
//   props<{ schedules: Schedule[] }>()
// );

// export const upsertSchedules = createAction(
//   '[Schedule/API] Upsert Schedules',
//   props<{ schedules: Schedule[] }>()
// );

export const updateSchedule = createAction(
  '[Schedule/API] Update Schedule',
  props<{ schedule: Schedule }>()
);
export const updateScheduleSuccess = createAction(
  '[Schedule/API] Update Schedule Success',
  props<{ schedule: Update<Schedule> }>()
);

// export const updateSchedules = createAction(
//   '[Schedule/API] Update Schedules',
//   props<{ schedules: Update<Schedule>[] }>()
// );

export const deleteSchedule = createAction(
  '[Schedule/API] Delete Schedule',
  props<{ id: number }>()
);
export const deleteScheduleSuccess = createAction(
  '[Schedule/API] Delete Schedule Success',
  props<{ id: number }>()
);

// export const deleteSchedules = createAction(
//   '[Schedule/API] Delete Schedules',
//   props<{ ids: string[] }>()
// );

export const clearSchedules = createAction(
  '[Schedule/API] Clear Schedules'
);


export const setEditingSchedule = createAction(
  '[Schedule/API] Set EditingSchedule',
  props<{ schedule: Schedule }>()
)
