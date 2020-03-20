import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpResponse } from '../services/http.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor() { }

  addUser(user: User): Observable<AppHttpResponse> { return null };

  updateUser(user: User): Observable<AppHttpResponse> { return null };

  addUserRole(userId: number, roleId: number): Observable<AppHttpResponse> { return null };

  deleteUserRole(userId: number, roleId: number): Observable<AppHttpResponse> { return null };

  addUserDepartment(userId: number, departmentId: number): Observable<AppHttpResponse> { return null };

  deleteUserDepartment(userId: number, departmentId: number): Observable<AppHttpResponse> { return null };

  getRoles(): Observable<AppHttpResponse> { return null };

  getAllUsers(): Observable<AppHttpResponse> { return null };

  getDepartmentUsers(departmentId: number): Observable<AppHttpResponse> { return null };

  getUserRoles(userId: number): Observable<AppHttpResponse> { return null };
}
