import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Template } from './template.model';
import { TemplateType } from './template-type.model';

export const addTemplate = createAction(
  '[Template/API] Add Template',
  props<{ departmentId: number, template: Template }>()
);
export const addTemplateSuccess = createAction(
  '[Template/API] Add Template Success',
  props<{ template: Template }>()
);

export const updateTemplate = createAction(
  '[Template/API] Update Template',
  props<{ template: Template }>()
);
export const updateTemplateSuccess = createAction(
  '[Template/API] Update Template Success',
  props<{ template: Update<Template> }>()
);

export const getTemplates = createAction(
  '[Template/API] Get Templates',
  props<{ departmentId: number }>()
);
export const getTemplatesSuccess = createAction(
  '[Template/API] Get Templates Success',
  props<{ templates: Template[] }>()
);
export const getTemplateTypes = createAction(
  '[Template/API] Get TemplateTypes',
  // props<{ departmentID: number }>()
);
export const getTemplateTypesSuccess = createAction(
  '[Template/API] Get TemplateTypes Success',
  props<{ templateTypes: TemplateType[] }>()
);




// export const upsertTemplate = createAction(
//   '[Template/API] Upsert Template',
//   props<{ template: Template }>()
// );

// export const addTemplates = createAction(
//   '[Template/API] Add Templates',
//   props<{ templates: Template[] }>()
// );

// export const upsertTemplates = createAction(
//   '[Template/API] Upsert Templates',
//   props<{ templates: Template[] }>()
// );


// export const updateTemplates = createAction(
//   '[Template/API] Update Templates',
//   props<{ templates: Update<Template>[] }>()
// );

// export const deleteTemplate = createAction(
//   '[Template/API] Delete Template',
//   props<{ id: string }>()
// );

// export const deleteTemplates = createAction(
//   '[Template/API] Delete Templates',
//   props<{ ids: string[] }>()
// );

export const clearTemplates = createAction(
  '[Template/API] Clear Templates'
);
