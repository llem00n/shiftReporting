import { createAction, props } from '@ngrx/store';
import { Configuration } from './configuration.model';

export const getConfigurations = createAction(
  '[Configuration] Get Configurations'
);

export const getConfigurationsSuccess = createAction(
  '[Configuration] Get Configurations Success',
  props<{ configurations: Configuration[] }>()
);
