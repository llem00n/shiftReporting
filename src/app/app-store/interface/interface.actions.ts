import { createAction, props } from '@ngrx/store';
import { Interface } from './interface.model';

export const addInterface = createAction(
  '[Interface] Add Interface',
  props<{ intface: Interface, templateId: number }>()
);
export const updateInterface = createAction(
  '[Interface] Update Interface',
  props<{ intface: Interface, templateId: number }>()
);
export const getInterfaces = createAction(
  '[Interface] Get Interfaces',
  props<{ templateId: number }>()
);

export const getInterfacesSuccess = createAction(
  '[Interface] Get Interfaces Success',
  props<{ interfaces: Interface[] }>()
);

