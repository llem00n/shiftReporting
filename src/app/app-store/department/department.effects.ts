import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DepartmentHttpService } from './department-http.service';
import { DepartmentActions, PlantActions } from '@actions/*';
import { mergeMap, filter, map } from 'rxjs/operators';



@Injectable()
export class DepartmentEffects {

  loadDepartments$ = createEffect(() => this.actions$.pipe(
    ofType(DepartmentActions.loadDepartments),
    mergeMap(action => this.departmentHttpService.getDepartments(action.plantId).pipe(
      filter(resp => !!resp),
      map(resp => DepartmentActions.loadDepartmentsSuccess({ departments: resp.body }))
    )),
  ));

  constructor(
    private actions$: Actions,
    private departmentHttpService: DepartmentHttpService
  ) { }

}
