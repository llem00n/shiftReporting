import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Template } from './template.model';
import * as TemplateActions from './template.actions';
import { TemplateType } from './template-type.model';

export const templatesFeatureKey = 'templates';

export interface State extends EntityState<Template> {
  // additional entities state properties
  templateTypes: TemplateType[];
  editingTemplate: Template;
  addedTemplate: Template;
}

export const adapter: EntityAdapter<Template> = createEntityAdapter<Template>({
  selectId: (model: Template) => model.templateId
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  templateTypes: [],
  editingTemplate: null,
  addedTemplate: null,
});

const templateReducer = createReducer(
  initialState,
  on(TemplateActions.addTemplateSuccess,
    (state, action) => adapter.addOne(action.template, state)
  ),
  on(TemplateActions.addTemplateSuccess,
    (state, action) => ({ ...state, addedTemplate: action.template })
  ),
  on(TemplateActions.updateTemplateSuccess,
    (state, action) => adapter.updateOne(action.template, state)
  ),
  on(TemplateActions.updateTemplateSuccess,
    (state, action) => ({ ...state, addedTemplate: <Template>{templateId: action.template.id} })
  ),
  on(TemplateActions.getTemplatesSuccess,
    (state, action) => adapter.setAll(action.templates, state)
  ),
  on(TemplateActions.clearTemplates,
    state => adapter.removeAll(state)
  ),
  on(TemplateActions.getTemplateTypesSuccess,
    (state, { templateTypes }) => ({ ...state, templateTypes })
  ),
  on(TemplateActions.setEditingTemplate,
    (state, { template }) => ({ ...state, editingTemplate: template })
  ),
  on(TemplateActions.setAddedTemplate,
    (state, { template }) => ({ ...state, addedTemplate: template })
  ),
  on(TemplateActions.deleteTemplateSuccess,
    (state, action) => adapter.removeOne(action.id, state)
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return templateReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
