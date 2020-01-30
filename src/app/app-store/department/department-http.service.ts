import { Injectable } from '@angular/core';
import { HttpService, AppHttpResponse, AppHttpRequest } from '../services/http.service';
import { Department } from './department.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentHttpService {

  baseUrl = 'departments/'


  constructor(private httpService: HttpService) { }

  addDepartment(department: Department): Observable<AppHttpResponse> {
    return of(null)
  }

  updateDepartment(department: Department): Observable<AppHttpResponse> {
    return of(null)
  }

  deleteDepartment(departmentId: number): Observable<AppHttpResponse> {
    return of(null)
  }

  getDepartments(plantId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDepartments',
      loadingMsg: 'Loading departments ...',
      payload: { plantId }
    }
    return of({
      status: 200,
      body: [
        <Department>{
          departmentID: 1,
          description: 'description1',
          name: 'name1',
          plantID: 1
        },
        <Department>{
          departmentID: 2,
          description: 'description2',
          name: 'name2',
          plantID: 2
        },
      ]
    })

    return this.httpService.post<AppHttpResponse>(options)
  }

}
