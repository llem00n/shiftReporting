import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Plant } from './plant.model';



export const getPlants = createAction(
  '[Plant/API] Get Plants'
);
export const getPlantsSuccess = createAction(
  '[Plant/API] Get Plants Success',
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
export const updatePlant = createAction(
  '[Plant/API] Update Plant',
  props<{ plant: Plant }>()
);
export const updatePlantSucces = createAction(
  '[Plant/API] Update Plant Succes',
  props<{ plant: Update<Plant> }>()
);

export const deletePlant = createAction(
  '[Plant/API] Delete Plant',
  props<{ id: number }>()
);
export const deletePlantSuccess = createAction(
  '[Plant/API] Delete Plant Success',
  props<{ id: number }>()
);
