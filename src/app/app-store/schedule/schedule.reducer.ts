import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Schedule } from './schedule.model';
import * as ScheduleActions from './schedule.actions';

export const schedulesFeatureKey = 'schedules';

export interface State extends EntityState<Schedule> {
  // additional entities state properties
  editingSchedule: Schedule;
}

export const adapter: EntityAdapter<Schedule> = createEntityAdapter<Schedule>({
  selectId: (model: Schedule) => model.scheduleId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  editingSchedule: null,
});

const scheduleReducer = createReducer(
  initialState,
  on(ScheduleActions.addScheduleSuccess,
    (state, action) => adapter.addOne(action.schedule, state)
  ),
  // on(ScheduleActions.upsertSchedule,
  //   (state, action) => adapter.upsertOne(action.schedule, state)
  // ),
  // on(ScheduleActions.addSchedules,
  //   (state, action) => adapter.addMany(action.schedules, state)
  // ),
  // on(ScheduleActions.upsertSchedules,
  //   (state, action) => adapter.upsertMany(action.schedules, state)
  // ),
  on(ScheduleActions.updateScheduleSuccess,
    (state, action) => adapter.updateOne(action.schedule, state)
  ),
  // on(ScheduleActions.updateSchedules,
  //   (state, action) => adapter.updateMany(action.schedules, state)
  // ),
  on(ScheduleActions.deleteScheduleSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  // on(ScheduleActions.deleteSchedules,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  on(ScheduleActions.getSchedulesSuccess,
    (state, action) => adapter.setAll(action.schedules, state)
  ),
  on(ScheduleActions.clearSchedules,
    state => adapter.removeAll(state)
  ),
  on(ScheduleActions.setEditingSchedule,
    (state, { schedule }) => ({ ...state, editingSchedule: schedule })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return scheduleReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
