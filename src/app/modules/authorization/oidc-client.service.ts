import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OidcClientService {
  private manager: UserManager;
  // private user: User = null;

  // FAKE_USER
  FAKE_USER = <User>{
    expired: false,
    token_type: 'Bearer',
    access_token: 'token',
    profile: { sub: 'e8d13b04-dbda-4c2b-8c5c-66988098d84a' }
  }
  // private user = this.FAKE_USER
  private user = null;

  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

    this.load()
    // .then((res: UserManagerSettings) => {
    //   this.manager = new UserManager(res);
    //   return this.manager.getUser()
    // })
    // .then(user => {
    //   // FAKE_USER
    //   this.user = user;
    //   // this.user = this.FAKE_USER;
    // });
  }

  load(): Promise<void> {
    const jsonFile = `assets/oidc-config.json`;
    return this.http.get(jsonFile)
      .toPromise()
      .then((res: UserManagerSettings) => {
        this.manager = new UserManager(res);
        return this.manager.getUser()
      })
      .then(user => {
        // console.log(this.manager.getUser());

        // FAKE_USER
        this.user = user;
        // this.user = this.FAKE_USER;
      })
      .catch(rej => console.log(rej));
  }

  getUser(): User {
    return this.user
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }
  getClaims(): any {
    return this.user.profile;
  }
  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }
  startAuthentication(): Promise<void> {
    return this.load()
      .then(_ => this.manager.signinRedirect())
    // return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    // console.log('completeAuthentication');

    return this.load()
      .then(_ => {
        return this.manager.signinRedirectCallback('');
        // this.redirectUrl && this.router.navigate([this.redirectUrl]);
      })
      .then(user => {
        // console.log('completeAuthentication', user);

        this.user = user;
      })

    // return this.load()
    //   .then((res: UserManagerSettings) => {
    //     this.manager = new UserManager(res);
    //   })
    //   .then(user => {
    //     // FAKE_USER
    //     this.user = user;
    //     // this.user = this.FAKE_USER;
    //     this.redirectUrl && this.router.navigate([this.redirectUrl]);
    //   });

  }
  logout() {
    this.manager.signoutRedirect()
  }
}