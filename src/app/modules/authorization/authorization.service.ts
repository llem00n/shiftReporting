import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserRole } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  user: User;
  

  constructor() {
    this.user = {
      name: 'userName',
      role: UserRole["System administrator"]
    }
   }

  getCurrentUser(): Observable<User> {
    return of(this.user);
  }

}
