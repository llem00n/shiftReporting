import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, filter } from 'rxjs/operators';

import * as InterfaceActions from './interface.actions';
import { InterfaceHttpService } from './interface-http.service';



@Injectable()
export class InterfaceEffects {

  getInterfaceTypes$ = createEffect(() => this.actions$.pipe(
    ofType(InterfaceActions.getInterfaceTypes),
    mergeMap(_ => this.interfaceHttpService.getInterfaceTypes().pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => InterfaceActions.getInterfaceTypesSuccess({ interfaceTypes: resp.body }))
    )),
  ));
  addInterface$ = createEffect(() => this.actions$.pipe(
    ofType(InterfaceActions.addInterface),
    mergeMap(action => this.interfaceHttpService.addInterface(action.intface).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => InterfaceActions.addInterfaceSuccess({ intface: resp.body }))
    )),
  ));
  updateInterface$ = createEffect(() => this.actions$.pipe(
    ofType(InterfaceActions.updateInterface),
    mergeMap(action => this.interfaceHttpService.updateInterface(action.intface).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => InterfaceActions.updateInterfaceSuccess({ intface: resp.body }))
    )),
  ));
  deleteInterface$ = createEffect(() => this.actions$.pipe(
    ofType(InterfaceActions.deleteInterface),
    mergeMap(action => this.interfaceHttpService.deleteInterface(action.intfaceID).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => InterfaceActions.deleteInterfaceSuccess({ intfaceID: resp.body }))
    )),
  ));
  constructor(
    private actions$: Actions,
    private interfaceHttpService: InterfaceHttpService
  ) { }

}
