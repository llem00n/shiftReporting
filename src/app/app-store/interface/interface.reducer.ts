import { Action, createReducer, on } from '@ngrx/store';
import * as InterfaceActions from './interface.actions';
import { Interface } from './interface.model';

export const interfaceFeatureKey = 'interface';

export interface State {
  interfaces: Interface[];
  // interfaceTypes: InterfaceType[];
}

export const initialState: State = {
  interfaces: [],
  // interfaceTypes: null
};

const interfaceReducer = createReducer(
  initialState,
  on(InterfaceActions.getInterfacesSuccess, (state, { interfaces }) =>
    ({ ...state, interfaces })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return interfaceReducer(state, action);
}
