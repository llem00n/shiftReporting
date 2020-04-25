import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlantActions } from '../actions';
import { map, mergeMap, tap, filter } from 'rxjs/operators';
import { PlantHttpService } from './plant-http.service';



@Injectable()
export class PlantEffects {

  getPlants$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.getPlants),
    mergeMap(_ => this.plantService.getPlants().pipe(
      filter(resp => !!resp),
      map(resp => PlantActions.getPlantsSuccess({ plants: resp.body }))
    )),
  ));

  addPlant$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.addPlant),
    mergeMap(action => this.plantService.addPlant(action.plant).pipe(
      filter(resp => !!resp),
      map(resp => PlantActions.addPlantSuccess({ plant: resp.body }))
    )),
  ));

  deletePlant$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.deletePlant),
    mergeMap(action => this.plantService.deletePlant(action.id).pipe(
      filter(resp => resp && resp.status === 200),
      map(val => PlantActions.deletePlantSuccess({ id: action.id }))
    )),
  ))

  updatePlant$ = createEffect(() => this.actions$.pipe(
    ofType(PlantActions.updatePlant),
    mergeMap(action => this.plantService.updatePlant(action.plant).pipe(
      filter(resp => !!resp),
      map(resp => PlantActions.updatePlantSucces({
        plant: {
          id: resp.body.plantId,
          changes: resp.body
        }
      }))
    )),
  ));




  constructor(
    private actions$: Actions,
    private plantService: PlantHttpService
  ) { }

}
