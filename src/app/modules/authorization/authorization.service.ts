import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
// import { User, UserRole } from './user.model';
import { Router } from '@angular/router';
import { User } from '@models/*';
import { HttpService, AppHttpResponse, AppHttpRequest } from 'src/app/services/http/http.service';
import { map, take, tap } from 'rxjs/operators';
// import { User } from 'src/app/app-store/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private currentUser = new BehaviorSubject<User>(null);
  isLoggedIn = false;
  redirectUrl: string;

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) { }

  setCurrentUser(userId: string): void {
    this.getUser(userId)
      .pipe(
        map(req => req.body),
        tap(user => {
          this.currentUser.next(user);
          this.redirectUrl && this.router.navigate([this.redirectUrl]);
        })
      ).subscribe()
  }


  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }
  logout() {
    this.currentUser.next(null);
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }

  getUser(userId): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: 'users/getUser',
      loadingMsg: 'Loading user ...',
      payload: { userId }
    }
    return this.httpService.post<AppHttpResponse>(options)
  };



}
