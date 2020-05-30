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
  // on(InterfaceActions.loadInterfaces, state => state),
  // on(InterfaceActions.loadInterfacesSuccess, (state, action) => state),
  // on(InterfaceActions.loadInterfacesFailure, (state, action) => state),
  on(InterfaceActions.getInterfacesSuccess, (state, { interfaces }) =>
    ({ ...state, interfaces })
  ),
  // on(InterfaceActions.addInterfaceSuccess, (state, { intface }) =>
  //   ({ ...state, interface: intface })
  // ),
  // on(InterfaceActions.updateInterfaceSuccess, (state, { intface }) =>
  //   ({ ...state, interface: intface })
  // ),
  // on(InterfaceActions.deleteInterfaceSuccess, (state, { intfaceID }) =>
  //   ({ ...state, interface: null })
  // ),


);

export function reducer(state: State | undefined, action: Action) {
  return interfaceReducer(state, action);
}
