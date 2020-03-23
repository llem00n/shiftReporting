import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '@actions/*';
import { mergeMap, filter, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { UserHttpService } from './user-http.service';



@Injectable()
export class UserEffects {

  getAllUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getAllUsers),
    mergeMap(_ => this.userHttpService.getAllUsers().pipe(
      filter(resp => !!resp),
      map(resp => UserActions.getAllUsersSuccess({ users: resp.body }))
    )),
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    mergeMap(action => this.userHttpService.updateUser(action.user).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => UserActions.updateUserSuccess({
        user: {
          id: resp.body.userId,
          changes: resp.body
        }
      }))
    )),
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.addUser),
    mergeMap(action => this.userHttpService.addUser(action.user).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => UserActions.addUserSuccess({ user: resp.body }))
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


  constructor(
    private userHttpService: UserHttpService,
    private actions$: Actions
  ) { }

}
