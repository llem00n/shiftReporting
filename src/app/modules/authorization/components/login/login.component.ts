import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization.service';
import { State, User } from '@models/*';
import { Store, select } from '@ngrx/store';
import { UserActions } from '@actions/*';
import { allUsers, allDepartments } from 'src/app/app-store';
import { OidcClientService } from '../../oidc-client.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

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
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.store.pipe(
      select(allDepartments),
      tap(_ => this.authService.updateUserDepartments())
    ).subscribe()

    this.oidcService.completeAuthentication().then(_ => {
      this.authService.setCurrentUser();
      this.router.navigate(['calendar'])
    });
  }
}
