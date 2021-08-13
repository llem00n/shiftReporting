import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
// import { User, UserRole } from './user.model';
import { Router } from '@angular/router';
import { User, Role, Department } from '@models/*';
import { HttpService, AppHttpResponse, AppHttpRequest } from 'src/app/services/http/http.service';
import { map, take, tap, mergeMap, switchMap, filter } from 'rxjs/operators';
import { OidcClientService } from './oidc-client.service';
// import { User } from 'src/app/app-store/user/user.model';

// export interface CurrentUser {
//   user: User;
//   roles: Role[];
//   departments: Department[];
// }

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private currentUser = new BehaviorSubject<User>(null);

  // isLoggedIn = false;
  redirectUrl: string;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private oidcClientService: OidcClientService,
  ) {
    // FAKE_USER
    // this.setCurrentUser()
  }

  setCurrentUser(): void {
    const userId = this.oidcClientService.getUser().profile.sub;
    this.getUser(userId)
      .pipe(
        tap(currentUser => {
          this.currentUser.next(currentUser);
          this.redirectUrl && this.router.navigate([this.redirectUrl]);
        })
      ).subscribe()
  }


  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  updateUserDepartments() {
    this.currentUser.pipe(
      take(1),
      filter(data => !!data),
      switchMap(user => this.getUserDepartments(user).pipe(
        map(({ body }) => { return <User>{ ...user, departments: body } })
      )))
      .subscribe(user => {
        this.currentUser.next(user);
      })
  }

  getUserDepartments(user: User): Observable<AppHttpResponse> {
    const optionsDepartments: AppHttpRequest = {
      url: 'departments/GetUserDepartments',
      loadingMsg: 'Loading user depatments ...',
      payload: { userId: user.userId }
    }
    const optionsAllDepartments: AppHttpRequest = {
      url: 'departments/GetAllDepartments',
      loadingMsg: 'Loading user depatments ...',
    }
    const options = user.roleId < 3 ? optionsAllDepartments : optionsDepartments;
    return this.httpService.post<AppHttpResponse>(options)
  }

  getUser(userId): Observable<User> {
    const options: AppHttpRequest = {
      url: 'users/getUser',
      loadingMsg: 'Loading user role ...',
      payload: { userId }
    }
    return this.httpService.post<AppHttpResponse>(options)
      .pipe(
        filter(resp => resp && resp.status === 200),
        map(({ body }) => body),
        switchMap(user => this.getUserDepartments(user).pipe(
          map(({ body }) => { return <User>{ ...user, departments: body } })
        ))
      );
  };
}
