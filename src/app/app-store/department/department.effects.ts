import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DepartmentHttpService } from './department-http.service';
import { DepartmentActions } from '@actions/*';
import { mergeMap, filter, map } from 'rxjs/operators';



@Injectable()
export class DepartmentEffects {

  getDepartments$ = createEffect(() => this.actions$.pipe(
    ofType(DepartmentActions.getDepartments),
    mergeMap(action => this.departmentHttpService.getDepartments(action.plantId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DepartmentActions.getDepartmentsSuccess({ departments: resp.body }))
    )),
  ));

  addDepartment$ = createEffect(() => this.actions$.pipe(
    ofType(DepartmentActions.addDepartment),
    mergeMap(action => this.departmentHttpService.addDepartment(action.department).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DepartmentActions.addDepartmentSucces({ department: resp.body }))
    )),
  ));

  deleteDepartment$ = createEffect(() => this.actions$.pipe(
    ofType(DepartmentActions.deleteDepartment),
    mergeMap(action => this.departmentHttpService.deleteDepartment(action.id).pipe(
      filter(resp => resp && resp.status === 200),
      map(_ => DepartmentActions.deleteDepartmentSucces({ id: action.id })),
    )),
  ))

  updateDepartment$ = createEffect(() => this.actions$.pipe(
    ofType(DepartmentActions.updateDepartment),
    mergeMap(action => this.departmentHttpService.updateDepartment(action.department).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DepartmentActions.updateDepartmentSuccess({
        department: {
          id: resp.body.departmentId,
          changes: resp.body
        }
      }))
    )),
  ));
  getUserDepartments$ = createEffect(() => this.actions$.pipe(
    ofType(DepartmentActions.getUserDepartments),
    mergeMap(action => this.departmentHttpService.getUserDepartments(action.userId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => DepartmentActions.getUserDepartmentsSucces({ departments: resp.body })),
    )),
  ))


  constructor(
    private actions$: Actions,
    private departmentHttpService: DepartmentHttpService
  ) { }
}
