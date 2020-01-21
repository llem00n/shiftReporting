import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlantActions } from '../actions';
import { map, mergeMap, tap } from 'rxjs/operators';
import { PlantService } from 'src/app/services/http/plant/plant.service';



@Injectable()
export class PlantEffects {

  loadPlants$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.loadPlants),
    mergeMap(_ => this.plantService.getPlants().pipe(
      map(plants => PlantActions.loadPlantsSuccess({ plants }))
    )),
  ));

  addPlant$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.addPlant),
    mergeMap(action => this.plantService.addPlant(action.plant).pipe(
    )),
    map(plant => PlantActions.addPlantSuccess({ plant }))
  ));



  constructor(
    private actions$: Actions,
    private plantService: PlantService
  ) { }

}
