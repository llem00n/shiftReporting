import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from '@actions/*';
import { mergeMap, filter, map } from 'rxjs/operators';
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


  constructor(
    private userHttpService: UserHttpService,
    private actions$: Actions
    ) {}

}
