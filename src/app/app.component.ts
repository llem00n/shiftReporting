import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthorizationService } from './modules/authorization/authorization.service';
import { map, filter } from 'rxjs/operators';
import { OidcClientService } from './modules/authorization/oidc-client.service';
import { User } from './models';
import { routerLinks } from './modules/authorization/guards/role.guard';

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

  constructor(
    private authService: AuthorizationService,
    private oidcCLientService: OidcClientService,
  ) { }


  ngOnInit(): void {
    this.authService.getCurrentUser()
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        if (!currentUser) return;
        this.userName = `${currentUser?.firstName} ${currentUser?.secondName}`;
        this.abbreviation = currentUser?.firstName.slice(0, 1).toUpperCase() + currentUser?.secondName.slice(0, 1).toUpperCase();
        this.config.map(item => item['isShow'] = item.allowedRoles.includes(currentUser.roleId))
      })

  }

  logout() {
    this.oidcCLientService.logout()
  }
}
