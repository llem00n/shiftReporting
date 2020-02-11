import { createAction, props } from '@ngrx/store';
import { InterfaceType } from './interface-type.model';
import { Interface } from './interface.model';

export const getInterfaceTypes = createAction(
  '[Interface] Get InterfaceTypes'
);
export const getInterfaceTypesSuccess = createAction(
  '[Interface] Get InterfaceTypes Success',
  props<{ interfaceTypes: InterfaceType[] }>()
);

export const addInterface = createAction(
  '[Interface] Add Interface',
  props<{ intface: Interface }>()
);
export const addInterfaceSuccess = createAction(
  '[Interface] Add Interface Success',
  props<{ intface: Interface }>()
);

export const updateInterface = createAction(
  '[Interface] Update Interface',
  props<{ intface: Interface }>()
);
export const updateInterfaceSuccess = createAction(
  '[Interface] Update Interface Success',
  props<{ intface: Interface }>()
);

export const deleteInterface = createAction(
  '[Interface] Delete Interface',
  props<{ intfaceID: number }>()
);
export const deleteInterfaceSuccess = createAction(
  '[Interface] Delete Interface Success',
  props<{ intfaceID: number }>()
);

