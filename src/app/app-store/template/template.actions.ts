import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Template } from './template.model';

export const loadTemplates = createAction(
  '[Template/API] Load Templates', 
  props<{ templates: Template[] }>()
);

export const addTemplate = createAction(
  '[Template/API] Add Template',
  props<{ template: Template }>()
);

export const upsertTemplate = createAction(
  '[Template/API] Upsert Template',
  props<{ template: Template }>()
);

export const addTemplates = createAction(
  '[Template/API] Add Templates',
  props<{ templates: Template[] }>()
);

export const upsertTemplates = createAction(
  '[Template/API] Upsert Templates',
  props<{ templates: Template[] }>()
);

export const updateTemplate = createAction(
  '[Template/API] Update Template',
  props<{ template: Update<Template> }>()
);

export const updateTemplates = createAction(
  '[Template/API] Update Templates',
  props<{ templates: Update<Template>[] }>()
);

export const deleteTemplate = createAction(
  '[Template/API] Delete Template',
  props<{ id: string }>()
);

export const deleteTemplates = createAction(
  '[Template/API] Delete Templates',
  props<{ ids: string[] }>()
);

export const clearTemplates = createAction(
  '[Template/API] Clear Templates'
);
