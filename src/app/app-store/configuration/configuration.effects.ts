import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, filter } from 'rxjs/operators';

import * as ConfigurationActions from './configuration.actions';
import { ConfigurationHttpService } from './configuration-http.service';



@Injectable()
export class ConfigurationEffects {

  loadConfigurations$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.getConfigurations),
    mergeMap(_ => this.configHttpService.getConfigurations().pipe(
      map(configurations => ConfigurationActions.getConfigurationsSuccess({ configurations }))
    ))
  ));
  updateConfigurations$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.updateConfigurations),
    mergeMap(action => this.configHttpService.updateConfigurations(action.configurations)
      .pipe(
        filter(resp => resp && resp.status === 200),
        map(configurations => ConfigurationActions.getConfigurations())
      ))
  ));

  constructor(
    private actions$: Actions,
    private configHttpService: ConfigurationHttpService,
  ) { }

}
