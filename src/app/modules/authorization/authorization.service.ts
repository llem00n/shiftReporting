import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User, UserRole } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  currentUser = new BehaviorSubject<User>(null);
  isLoggedIn = false;
  redirectUrl: string;

  constructor(
    private router: Router,
  ) { }
  
  setCurrentUser(user: User): void {
    // console.log(this.redirectUrl);
    this.currentUser.next(user);
    this.redirectUrl && this.router.navigate([this.redirectUrl])
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }
}
