import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Plant } from './plant.model';
import * as PlantActions from './plant.actions';

export const plantsFeatureKey = 'plants';

export interface State extends EntityState<Plant> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Plant> = createEntityAdapter<Plant>({
  selectId: (model: Plant) => model.plantId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const plantReducer = createReducer(
  initialState,
  on(PlantActions.addPlantSuccess,
    (state, action) => adapter.addOne(action.plant, state)
  ),
  on(PlantActions.updatePlantSucces,
    (state, action) => adapter.updateOne(action.plant, state)
  ),
  on(PlantActions.deletePlantSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PlantActions.getPlantsSuccess,
    (state, action) => adapter.setAll(action.plants, state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return plantReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
