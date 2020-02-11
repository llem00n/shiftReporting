import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromPlant from './plant/plant.reducer';
import * as fromDepartment from './department/department.reducer';
import * as fromShift from './shift/shift.reducer';
import * as fromSchedule from './schedule/schedule.reducer';
import * as fromTemplate from './template/template.reducer';
import * as fromInterface from './interface/interface.reducer';

export interface State {

  [fromPlant.plantsFeatureKey]: fromPlant.State;
  [fromDepartment.departmentsFeatureKey]: fromDepartment.State;
  [fromShift.shiftsFeatureKey]: fromShift.State;
  [fromSchedule.schedulesFeatureKey]: fromSchedule.State;
  [fromTemplate.templatesFeatureKey]: fromTemplate.State;
  [fromInterface.interfaceFeatureKey]: fromInterface.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromPlant.plantsFeatureKey]: fromPlant.reducer,
  [fromDepartment.departmentsFeatureKey]: fromDepartment.reducer,
  [fromShift.shiftsFeatureKey]: fromShift.reducer,
  [fromSchedule.schedulesFeatureKey]: fromSchedule.reducer,
  [fromTemplate.templatesFeatureKey]: fromTemplate.reducer,
  [fromInterface.interfaceFeatureKey]: fromInterface.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


// ========= selectors ========
// plants
export const plantState = createFeatureSelector<fromPlant.State>('plants');
export const allPlants = createSelector(plantState, fromPlant.selectAll);
//departments
export const departmentsState = createFeatureSelector<fromDepartment.State>('departments');
export const allDepartments = createSelector(departmentsState, fromDepartment.selectAll);
//shifts
export const shiftsState = createFeatureSelector<fromShift.State>('shifts');
export const allShifts = createSelector(shiftsState, fromShift.selectAll);
//shifts
export const scheduleState = createFeatureSelector<fromSchedule.State>('schedules');
export const allSchedules = createSelector(scheduleState, fromSchedule.selectAll);
