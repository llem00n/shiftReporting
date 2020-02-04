import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Shift } from './shift.model';

export const getShifts = createAction(
  '[Shift/API] Get Shifts',
  props<{ departmentId: number }>()
);
export const getShiftsSuccess = createAction(
  '[Shift/API] Get Shifts Success',
  props<{ shifts: Shift[] }>()
);

export const addShift = createAction(
  '[Shift/API] Add Shift',
  props<{ shift: Shift }>()
);
export const addShiftSuccess = createAction(
  '[Shift/API] Add Shift Success',
  props<{ shift: Shift }>()
);
export const updateShift = createAction(
  '[Shift/API] Update Shift',
  props<{ shift: Shift }>()
);
export const updateShiftSuccess = createAction(
  '[Shift/API] Update Shift Success',
  props<{ shift: Update<Shift> }>()
);

export const deleteShift = createAction(
  '[Shift/API] Delete Shift',
  props<{ id: number }>()
);
export const deleteShiftSuccess = createAction(
  '[Shift/API] Delete Shift Success',
  props<{ id: number }>()
);

// export const upsertShift = createAction(
//   '[Shift/API] Upsert Shift',
//   props<{ shift: Shift }>()
// );

// export const addShifts = createAction(
//   '[Shift/API] Add Shifts',
//   props<{ shifts: Shift[] }>()
// );

// export const upsertShifts = createAction(
//   '[Shift/API] Upsert Shifts',
//   props<{ shifts: Shift[] }>()
// );


// export const updateShifts = createAction(
//   '[Shift/API] Update Shifts',
//   props<{ shifts: Update<Shift>[] }>()
// );


// export const deleteShifts = createAction(
//   '[Shift/API] Delete Shifts',
//   props<{ ids: string[] }>()
// );

export const clearShifts = createAction(
  '[Shift/API] Clear Shifts'
);
