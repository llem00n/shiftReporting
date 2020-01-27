import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlantActions } from '../actions';
import { map, mergeMap, tap, filter } from 'rxjs/operators';
import { PlantService } from './plant-http.service';



@Injectable()
export class PlantEffects {

  loadPlants$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.loadPlants),
    mergeMap(_ => this.plantService.getPlants().pipe(
      filter(resp => !!resp),
      map(resp => PlantActions.loadPlantsSuccess({ plants: resp.body }))
    )),
  ));

  addPlant$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.addPlant),
    mergeMap(action => this.plantService.addPlant(action.plant).pipe(
    )),
    map(resp => PlantActions.addPlantSuccess({ plant: resp.body }))
  ));

  deletePlant$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.deletePlant),
    mergeMap(action => this.plantService.deletePlant(action.id).pipe(
      filter(resp => resp.status === 200),
      map(val => PlantActions.deletePlantSuccess({ id: action.id }))
    )),
  ))



  constructor(
    private actions$: Actions,
    private plantService: PlantService
  ) { }

}
