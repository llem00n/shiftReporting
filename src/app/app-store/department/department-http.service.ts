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
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addDepartment',
      payload: { department },
      loadingMsg: 'Adding the department ...',
      successMsg: `Department has been added`
    }
    // return of({
    //   status: 200,
    //   body: Object.assign(department, {departmentId: Math.random()})
    // })
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateDepartment(department: Department): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateDepartment',
      payload: { department },
      loadingMsg: 'Updating the department ...',
      successMsg: `Department has been updated`
    }
    // return of({
    //   status: 200,
    //   body: department
    // })
    return this.httpService.post<AppHttpResponse>(options);
  }

  deleteDepartment(departmentId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'deleteDepartment',
      payload: { departmentId },
      loadingMsg: 'Deleting the department ...',
      successMsg: `Department has been deleted`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  getDepartments(plantId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDepartments',
      loadingMsg: 'Loading departments ...',
      payload: { plantId }
    }

    // return of({
    //   status: 200,
    //   body: [
    //     <Department>{
    //       departmentId: 1,
    //       description: 'description1',
    //       name: 'name1',
    //       plantID: plantId
    //     },
    //     <Department>{
    //       departmentId: 2,
    //       description: 'description2',
    //       name: 'name2',
    //       plantID: plantId
    //     },
    //   ]
    // })

    return this.httpService.post<AppHttpResponse>(options)
  }
  getUserDepartments(userId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getUserDepartments',
      loadingMsg: "Loading user's departments ...",
      payload: { userId }
    }
    return this.httpService.post<AppHttpResponse>(options)
  }

}
