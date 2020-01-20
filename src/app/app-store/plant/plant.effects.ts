import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlantActions } from '../actions';
import { map, mergeMap, tap } from 'rxjs/operators';
import { PlantService } from 'src/app/services/http/plant/plant.service';



@Injectable()
export class PlantEffects {

  loadPlants$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.loadPlants),
    mergeMap(_ => this.plantService.getPlants()),
    map(plants => PlantActions.loadPlantsSuccess({ plants }))
  ));

  constructor(
    private actions$: Actions,
    private plantService: PlantService
  ) { }

}
