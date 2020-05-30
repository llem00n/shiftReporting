import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization.service';
import { State, User } from '@models/*';
import { Store, select } from '@ngrx/store';
import { UserActions } from '@actions/*';
import { allUsers } from 'src/app/app-store';
import { OidcClientService } from '../../oidc-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  constructor(
    private authService: AuthorizationService,
    private oidcService: OidcClientService,
    private router: Router,
    // private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.oidcService.completeAuthentication().then(_ => {
      this.authService.setCurrentUser();
      this.router.navigate(['calendar'])
    });

    // this.getUsers()
  }

  // getUsers() {
  //   this.store.dispatch(UserActions.getAllUsers())
  //   this.store.pipe(
  //     select(allUsers)
  //   ).subscribe(users => {
  //     this.users = users;
  //     if (!users[0]) return;
  //     this.login(users[0])
  //   })
  // }

  // login(user: User) {
  //   this.authService.isLoggedIn = true;
  //   this.authService.setCurrentUser(user.userId)
  // }
}
