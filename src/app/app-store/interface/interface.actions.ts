import { createAction, props } from '@ngrx/store';
import { InterfaceType } from './interface-type.model';
import { Interface } from './interface.model';

export const addInterface = createAction(
  '[Interface] Add Interface',
  props<{ intface: Interface, templateId: number }>()
);
// export const addInterfaceSuccess = createAction(
//   '[Interface] Add Interface Success',
//   props<{ intface: Interface }>()
// );

export const updateInterface = createAction(
  '[Interface] Update Interface',
  props<{ intface: Interface, templateId: number }>()
);
// export const updateInterfaceSuccess = createAction(
//   '[Interface] Update Interface Success',
//   props<{ intface: Interface }>()
// );

export const getInterfaces = createAction(
  '[Interface] Get Interfaces',
  props<{ templateId: number }>()
);
export const getInterfacesSuccess = createAction(
  '[Interface] Get Interfaces Success',
  props<{ interfaces: Interface[] }>()
);

