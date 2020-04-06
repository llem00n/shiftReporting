import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, filter } from 'rxjs/operators';

import * as InterfaceActions from './interface.actions';
import { InterfaceHttpService } from './interface-http.service';



@Injectable()
export class InterfaceEffects {

  getInterfaces$ = createEffect(() => this.actions$.pipe(
    ofType(InterfaceActions.getInterfaces),
    mergeMap(({ templateId }) => this.interfaceHttpService.getInterfaces(templateId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => InterfaceActions.getInterfacesSuccess({ interfaces: resp.body }))
    )),
  ));

  addInterface$ = createEffect(() => this.actions$.pipe(
    ofType(InterfaceActions.addInterface),
    mergeMap(({ intface, templateId }) => this.interfaceHttpService.addInterface(intface, templateId).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => InterfaceActions.getInterfaces({ templateId }))
    )),
  ));

  updateInterface$ = createEffect(() => this.actions$.pipe(
    ofType(InterfaceActions.updateInterface),
    mergeMap(({ intface, templateId }) => this.interfaceHttpService.updateInterface(intface).pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => InterfaceActions.getInterfaces({ templateId }))
    )),
  ));

  constructor(
    private actions$: Actions,
    private interfaceHttpService: InterfaceHttpService
  ) { }

}
