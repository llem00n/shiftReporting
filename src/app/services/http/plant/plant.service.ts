import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/app-store/plant/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  baseUrl = 'plants/'

  constructor(
    private httpService: HttpService
  ) { }

  getPlants(): Observable<Plant[]> {
    return this.httpService.post<Plant[]>({ url: this.baseUrl + 'getPlants' })
  }

  getPlant() { }

  addPlant() { }

  updatePlant() { }

  deletePlant() { }


}
