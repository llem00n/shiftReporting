import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthorizationService } from './modules/authorization/authorization.service';
import { map, filter } from 'rxjs/operators';
import { OidcClientService } from './modules/authorization/oidc-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName: string;
  abbreviation: string;
  isSmall = false;
  config = [
    { key: 'configuration/plants', title: 'Plants', isShow: false, icon: 'factory' },
    { key: 'configuration/departments', title: 'Departments', isShow: false, icon: 'graph-outline' },
    { key: 'configuration/shifts', title: 'Shifts', isShow: false, icon: 'calendar' },
    { key: 'configuration/schedules', title: 'Schedule', isShow: false, icon: 'calendar-clock' },
    { key: 'configuration/templates', title: 'Template', isShow: false, icon: 'file-table-box' },
    { key: 'configuration/users', title: 'Users', icon: 'account-group' },
    
  ];

  constructor(
    private authService: AuthorizationService,
    private oidcCLientService: OidcClientService,
  ) { }


  ngOnInit(): void {
    this.authService.getCurrentUser()
      .subscribe(currentUser => {
        if (!currentUser) {
          this.userName = ''
          this.abbreviation = ''
          return;
        }
        this.userName = `${currentUser?.firstName} ${currentUser?.secondName}`;
        this.abbreviation = currentUser?.firstName.slice(0, 1).toUpperCase() + currentUser?.secondName.slice(0, 1).toUpperCase();
      })

  }

  logout() {
    this.oidcCLientService.logout()
  }
}
