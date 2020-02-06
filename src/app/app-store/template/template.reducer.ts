import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Template } from './template.model';
import * as TemplateActions from './template.actions';

export const templatesFeatureKey = 'templates';

export interface State extends EntityState<Template> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Template> = createEntityAdapter<Template>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const templateReducer = createReducer(
  initialState,
  on(TemplateActions.addTemplate,
    (state, action) => adapter.addOne(action.template, state)
  ),
  on(TemplateActions.upsertTemplate,
    (state, action) => adapter.upsertOne(action.template, state)
  ),
  on(TemplateActions.addTemplates,
    (state, action) => adapter.addMany(action.templates, state)
  ),
  on(TemplateActions.upsertTemplates,
    (state, action) => adapter.upsertMany(action.templates, state)
  ),
  on(TemplateActions.updateTemplate,
    (state, action) => adapter.updateOne(action.template, state)
  ),
  on(TemplateActions.updateTemplates,
    (state, action) => adapter.updateMany(action.templates, state)
  ),
  on(TemplateActions.deleteTemplate,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(TemplateActions.deleteTemplates,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(TemplateActions.loadTemplates,
    (state, action) => adapter.addAll(action.templates, state)
  ),
  on(TemplateActions.clearTemplates,
    state => adapter.removeAll(state)
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
