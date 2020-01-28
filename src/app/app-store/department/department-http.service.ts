import { Injectable } from '@angular/core';
import { HttpService, AppHttpResponse } from '../services/http.service';
import { Department } from './department.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentHttpService {

  constructor(private httpService: HttpService) { }

  AddDepartment(department: Department): Observable<AppHttpResponse> {
    return of(null)
  }

  UpdateDepartment(department: Department): Observable<AppHttpResponse> {
    return of(null)
  }

  DeleteDepartment(): Observable<AppHttpResponse> {
    return of(null)
  }

  GetDepartments(): Observable<AppHttpResponse> {
    return of(null)
  }

}
