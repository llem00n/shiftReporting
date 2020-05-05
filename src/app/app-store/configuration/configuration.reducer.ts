import {  createReducer, on } from '@ngrx/store';
import * as ConfigurationActions from './configuration.actions';
import { Configuration } from './configuration.model';

export const configurationFeatureKey = 'configuration';

export interface State {
  configurations: Configuration[];
}

export const initialState: State = {
  configurations: []
};


export const reducer = createReducer(
  initialState,

  on(ConfigurationActions.getConfigurationsSuccess,
    (state, { configurations }) => ({ ...state, configurations })),

);

