import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions, DepartmentActions } from '@actions/*';
import { mergeMap, filter, map, tap, concatMap, merge } from 'rxjs/operators';
import { EMPTY, forkJoin, of, Observable } from 'rxjs';
import { UserHttpService } from './user-http.service';
import { User } from './user.model';
import { roles } from '..';
import { DepartmentHttpService } from '../department/department-http.service';
import { AppHttpResponse } from 'src/app/services/http/http.service';
import { Department } from '../department/department.model';



@Injectable()
export class UserEffects {

  getAllUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getAllUsers),
    mergeMap(_ => this.userHttpService.getAllUsers().pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => resp.body),
    )),
    map((users) => users.map(user => {
      return {
        ...user,
        departments: this.departmentHttpService.getUserDepartments(user.userId),
      }
    })),
    mergeMap(users => forkJoin(users.map(user => user.departments)).pipe(
      map((resp: AppHttpResponse[]) => resp.map((item, key) => users[key].departments = resp[key].body)),
      map(_ => users),
    )),
    map(users => UserActions.getAllUsersSuccess({ users })),
  ));



  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    mergeMap(({ user, oldDep }) => {
      const oldDepIds = oldDep.map(o => o.departmentId);
      const newDepId = user.departments.map(d => d.departmentId);
      const addDepIds = newDepId.filter(n => !oldDepIds.includes(n));
      const delDepIds = oldDepIds.filter(n => !newDepId.includes(n));
      const depChanges = []
      addDepIds.map(d => depChanges.push(this.userHttpService.addUserDepartment(user.userId, d)));
      delDepIds.map(d => depChanges.push(this.userHttpService.deleteUserDepartment(user.userId, d)));
      if (!depChanges.length) return of(user)
      return forkJoin(depChanges).pipe(
        map(_ => user)
      );
    }),
    mergeMap(user => this.userHttpService.updateUser(user).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => resp.body),
    )),
    mergeMap((user: User) => this.departmentHttpService.getUserDepartments(user.userId).pipe(
      filter(resp => resp && resp.status === 200),
      tap(resp => user.departments = resp.body),
      map(resp => UserActions.updateUserSuccess({
        user: {
          id: user.userId,
          changes: user
        }
      }))
    )),
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.addUser),
    tap(console.log),
    mergeMap(action => this.userHttpService.addUser(action.user).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => { return { user: resp.body, addDepIds: action.user.departments.map(d => d.departmentId) } }),
    )),
    mergeMap(data => {
      const addDep = [];
      data.addDepIds.map(dId => addDep.push(this.userHttpService.addUserDepartment(data.user.userId, dId)));
      if (!addDep.length) return of(data.user)
      return forkJoin(addDep).pipe(
        map(_ => data.user)
      )
    }),
    mergeMap((user: User) => this.departmentHttpService.getUserDepartments(user.userId).pipe(
      filter(resp => resp && resp.status === 200),
      tap(resp => user.departments = resp.body),
      map(_ => UserActions.addUserSuccess({ user }))
    )),
  ));



  getRoles$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getRoles),
    mergeMap(action => this.userHttpService.getRoles().pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => UserActions.getRolesSuccess({ roles: resp.body }))
    )),
  ));


  getUserRoles$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUserRoles),
    mergeMap(action => this.userHttpService.getUserRoles(action.userId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => UserActions.getUserRolesSuccess({ roles: resp.body }))
    )),
  ));
  addUserRole$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.addUserRole),
    mergeMap(action => this.userHttpService.addUserRole(action.userId, action.roleId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => UserActions.getUserRoles({ userId: action.userId }))
    )),
  ));
  deleteUserRole$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteUserRole),
    mergeMap(action => this.userHttpService.deleteUserRole(action.userId, action.roleId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => UserActions.getUserRoles({ userId: action.userId }))
    )),
  ));

  // addUserDepartment$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.addUserDepartment),
  //   mergeMap(action => this.userHttpService.addUserDepartment(action.userId, action.departmentId).pipe(
  //     filter(resp => resp && resp.status === 200),
  //     map(resp => DepartmentActions.getUserDepartments({ userId: action.userId }))
  //   )),
  // ));

  // deleteUserDepartment$ = createEffect(() => this.actions$.pipe(
  //   ofType(UserActions.deleteUserDepartment),
  //   mergeMap(action => this.userHttpService.deleteUserDepartment(action.userId, action.departmentId).pipe(
  //     filter(resp => resp && resp.status === 200),
  //     map(resp => DepartmentActions.getUserDepartments({ userId: action.userId }))
  //   )),
  // ));


  constructor(
    private departmentHttpService: DepartmentHttpService,
    private userHttpService: UserHttpService,
    private actions$: Actions
  ) { }

}
