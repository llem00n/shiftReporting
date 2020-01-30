import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Plant } from './plant.model';



export const loadPlants = createAction(
  '[Plant/API] Load Plants',
  // props<{ plants: Plant[] }>()
);
export const loadPlantsSuccess = createAction(
  '[Plant/API] Load Plants Success',
  props<{ plants: Plant[] }>()
);

export const addPlant = createAction(
  '[Plant/API] Add Plant',
  props<{ plant: Plant }>()
);
export const addPlantSuccess = createAction(
  '[Plant/API] Add Plant Success',
  props<{ plant: Plant }>()
);

// export const upsertPlant = createAction(
//   '[Plant/API] Upsert Plant',
//   props<{ plant: Plant }>()
// );

// export const addPlants = createAction(
//   '[Plant/API] Add Plants',
//   props<{ plants: Plant[] }>()
// );

// export const upsertPlants = createAction(
//   '[Plant/API] Upsert Plants',
//   props<{ plants: Plant[] }>()
// );

export const updatePlant = createAction(
  '[Plant/API] Update Plant',
  props<{ plant: Plant }>()
);
export const updatePlantSucces = createAction(
  '[Plant/API] Update Plant Succes',
  props<{ plant: Update<Plant> }>()
);

// export const updatePlants = createAction(
//   '[Plant/API] Update Plants',
//   props<{ plants: Update<Plant>[] }>()
// );

export const deletePlant = createAction(
  '[Plant/API] Delete Plant',
  props<{ id: number }>()
);
export const deletePlantSuccess = createAction(
  '[Plant/API] Delete Plant Success',
  props<{ id: number }>()
);

// export const deletePlants = createAction(
//   '[Plant/API] Delete Plants',
//   props<{ ids: number[] }>()
// );

// export const clearPlants = createAction(
//   '[Plant/API] Clear Plants'
// );
