import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
// import { User, UserRole } from './user.model';
import { Router } from '@angular/router';
import { User } from '@models/*';
// import { User } from 'src/app/app-store/user/user.model';

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
    this.currentUser.next(user);
    this.redirectUrl && this.router.navigate([this.redirectUrl])
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }
  logout() {
    this.currentUser.next(null);
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }
}
