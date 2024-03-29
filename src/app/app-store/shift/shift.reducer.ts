import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Shift } from './shift.model';
import * as ShiftActions from './shift.actions';

export const shiftsFeatureKey = 'shifts';

export interface State extends EntityState<Shift> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Shift> = createEntityAdapter<Shift>({
  selectId: (model:Shift) => model.shiftId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const shiftReducer = createReducer(
  initialState,
  on(ShiftActions.addShiftSuccess,
    (state, action) => adapter.addOne(action.shift, state)
  ),
  // on(ShiftActions.upsertShift,
  //   (state, action) => adapter.upsertOne(action.shift, state)
  // ),
  // on(ShiftActions.addShifts,
  //   (state, action) => adapter.addMany(action.shifts, state)
  // ),
  // on(ShiftActions.upsertShifts,
  //   (state, action) => adapter.upsertMany(action.shifts, state)
  // ),
  on(ShiftActions.updateShiftSuccess,
    (state, action) => adapter.updateOne(action.shift, state)
  ),
  // on(ShiftActions.updateShifts,
  //   (state, action) => adapter.updateMany(action.shifts, state)
  // ),
  on(ShiftActions.deleteShiftSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  // on(ShiftActions.deleteShifts,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  on(ShiftActions.getShiftsSuccess,
    (state, action) => adapter.addAll(action.shifts, state)
  ),
  on(ShiftActions.clearShifts,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return shiftReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
