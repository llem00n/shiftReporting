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

export interface State {

  [fromPlant.plantsFeatureKey]: fromPlant.State;
  [fromDepartment.departmentsFeatureKey]: fromDepartment.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromPlant.plantsFeatureKey]: fromPlant.reducer,
  [fromDepartment.departmentsFeatureKey]: fromDepartment.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];


// ========= selectors ========
// plants
export const plantState = createFeatureSelector<fromPlant.State>('plants');
export const allPlants = createSelector(plantState, fromPlant.selectAll);
