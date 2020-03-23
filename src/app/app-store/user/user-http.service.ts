import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpResponse, AppHttpRequest, HttpService } from '../services/http.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  baseUrl = 'users/'
  constructor(
    private httpService: HttpService
  ) { }

  addUser(user: User): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addUser',
      payload: { user },
      loadingMsg: 'Adding the user ...',
      successMsg: `User has been added`
    }
    return this.httpService.post<AppHttpResponse>(options);
  };

  updateUser(user: User): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateUser',
      payload: { user },
      loadingMsg: 'Updating the user ...',
      successMsg: `User has been updated`
    }
    return this.httpService.post<AppHttpResponse>(options);
  };

  addUserRole(userId: number, roleId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { userId, roleId },
      url: this.baseUrl + 'addUserRole',
      loadingMsg: "Adding user's roles ...",
    }
    return this.httpService.post<AppHttpResponse>(options)
  };

  deleteUserRole(userId: number, roleId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { userId, roleId },
      url: this.baseUrl + 'deleteUserRole',
      loadingMsg: "Adding user's roles ...",
    }
    return this.httpService.post<AppHttpResponse>(options)
  };

  addUserDepartment(userId: number, departmentId: number): Observable<AppHttpResponse> { return null };

  deleteUserDepartment(userId: number, departmentId: number): Observable<AppHttpResponse> { return null };

  getRoles(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getRoles',
      loadingMsg: 'Loading roles ...',
    }
    return this.httpService.post<AppHttpResponse>(options)

  };

  getAllUsers(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getAllUsers',
      loadingMsg: 'Loading users ...',
    }
    return this.httpService.post<AppHttpResponse>(options)
  };

  getDepartmentUsers(departmentId: number): Observable<AppHttpResponse> { return null };

  getUserRoles(userId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: { userId },
      url: this.baseUrl + 'getUserRoles',
      loadingMsg: "Loading user's roles ...",
    }
    return this.httpService.post<AppHttpResponse>(options)
  };
}
