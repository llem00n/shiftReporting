import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  map,  mergeMap, filter } from 'rxjs/operators';

import * as ConfigurationActions from './configuration.actions';
import { ConfigurationHttpService } from './configuration-http.service';



@Injectable()
export class ConfigurationEffects {

  loadConfigurations$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.getConfigurations),
    mergeMap(_ => this.configHttpService.getConfigurations().pipe(
      filter(resp => resp && resp.status === 200),
      map(resp => ConfigurationActions.getConfigurationsSuccess({ configurations: resp.body }))
    ))
  ));

  constructor(
    private actions$: Actions,
    private configHttpService: ConfigurationHttpService,
  ) { }

}
