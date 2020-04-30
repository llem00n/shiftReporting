import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

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
    profile: { sub: '38368134-ed58-4073-8eae-5619e5e136c7' }
  }
  private user = this.FAKE_USER

  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

    this.load()
      .then((res: UserManagerSettings) => {
        console.log(res);
        this.manager = new UserManager(res);
        return this.manager.getUser()
      })
      .then(user => {
        // FAKE_USER
        // this.user = user;
        this.user = this.FAKE_USER;
        console.log(this.user);

      });
  }

  load() {
    const jsonFile = `assets/oidc-config.json`;
    return this.http.get(jsonFile)
      .toPromise()
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
    console.log(this.manager);

    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.load()
      .then((res: UserManagerSettings) => {
        this.manager = new UserManager(res);
        return this.manager.signinRedirectCallback()
      })
      .then(user => {
        // FAKE_USER
        // this.user = user;
        this.user = this.FAKE_USER;
        this.redirectUrl && this.router.navigate([this.redirectUrl]);

      });

  }
  logout() {
    this.manager.signoutRedirect()
  }
}