import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TemplateHttpService } from './template-http.service';
import { TemplateActions } from '@actions/*';
import { mergeMap, filter, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';



@Injectable()
export class TemplateEffects {

  addTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.addTemplate),
    mergeMap(({ departmentID, template }) => this.templateHttpService.addTemplate({ departmentID, template }).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => TemplateActions.addTemplateSuccess({ template: resp.body }))
    )),
  ));

  updateTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.updateTemplate),
    mergeMap(({ template }) => this.templateHttpService.updateTemplate(template).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => TemplateActions.updateTemplateSuccess({
        template: {
          id: resp.body.TemplateID,
          changes: resp.body
        }
      }))
    )),
  ));

  getTemplates$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.getTemplates),
    mergeMap(({ departmentID }) => this.templateHttpService.getTemplates(departmentID).pipe(
      filter(resp => resp && resp.status === 200),
      map(({ body }) => TemplateActions.getTemplatesSuccess({ templates: body }))
    )),
  ));

  getTemplateTypes$ = createEffect(() => this.actions$.pipe(
    ofType(TemplateActions.getTemplateTypes),
    mergeMap(_ => this.templateHttpService.getTemplateTypes().pipe(
      filter(resp => resp && resp.status === 200),
      map(({ body }) => TemplateActions.getTemplateTypesSuccess({ templateTypes: body }))
    )),
  ));

  constructor(
    private actions$: Actions,
    private templateHttpService: TemplateHttpService,
  ) { }

}
