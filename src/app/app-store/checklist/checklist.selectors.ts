import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromChecklist from './checklist.reducer';

export const selectChecklistState = createFeatureSelector<fromChecklist.State>(
  fromChecklist.checklistFeatureKey
);
