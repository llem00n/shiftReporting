import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthorizationService } from './modules/authorization/authorization.service';
import { map, filter, tap, mergeMap } from 'rxjs/operators';
import { OidcClientService } from './modules/authorization/oidc-client.service';
import { User, State, Role } from './models';
import { routerLinks } from './modules/authorization/guards/role.guard';
import { Store, select } from '@ngrx/store';
import { ConfigurationsActions, UserActions } from './app-store/actions'
import { getRoles } from './app-store/user/user.actions';
import { userRoles, roles } from './app-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName: string;
  abbreviation: string;
  isSmall = false;
  currentUser: User;
  config = routerLinks;
  roles: Role[];
  userRole: string = ""

  constructor(
    private authService: AuthorizationService,
    private oidcCLientService: OidcClientService,
    private store: Store<State>,
  ) { }


  ngOnInit(): void {
    this.store.pipe(
      select(roles),
      filter(roles => !!roles.length),
      tap(roles => this.roles = roles),
      tap(_ => this.userRole = this.roles.find(r => r.roleId === this.currentUser.roleId).roleName || '')
    ).subscribe(console.log);
    this.authService.getCurrentUser().pipe(
      filter(user => !!user),
      tap(currentUser => {
        this.currentUser = currentUser;
        this.store.dispatch(UserActions.getRoles());
        this.store.dispatch(ConfigurationsActions.getConfigurations());
        this.userName = `${currentUser?.firstName} ${currentUser?.secondName}`;
        this.abbreviation = currentUser?.firstName.slice(0, 1).toUpperCase() + currentUser?.secondName.slice(0, 1).toUpperCase();
        this.config.map(item => item['isShow'] = item.allowedRoles.includes(currentUser.roleId))
      }),
    ).subscribe()


  }

  logout() {
    this.oidcCLientService.logout()
  }
}
