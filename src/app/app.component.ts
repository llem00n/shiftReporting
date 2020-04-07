import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthorizationService } from './modules/authorization/authorization.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName: string;
  abbreviation: string;
  isSmall = true;
  config = [
    { key: 'configuration/plants', title: 'Plants', isShow: false, icon: 'factory' },
    { key: 'configuration/departments', title: 'Departments', isShow: false, icon: 'graph-outline' },
    { key: 'configuration/shifts', title: 'Shifts', isShow: false, icon: 'calendar' },
    { key: 'configuration/schedules', title: 'Schedule', isShow: false, icon: 'calendar' },
    { key: 'configuration/templates', title: 'Template', isShow: false, icon: 'alpha-t-box-outline' },
    { key: 'configuration/users', title: 'Users', icon: 'account-group' },
  ];

  constructor(
    private authService: AuthorizationService,
  ) { }


  ngOnInit(): void {
    this.authService.getCurrentUser()
      .subscribe(currentUser => {
        if (!currentUser) {
          this.userName = ''
          this.abbreviation = ''
          return;
        }
        const { user } = currentUser
        this.userName = `${user.firstName} ${user.secondName}`;
        this.abbreviation = user.firstName.slice(0, 1).toUpperCase() + user.secondName.slice(0, 1).toUpperCase();
      })

  }

  logout() {
    // console.log('logout');

    this.authService.logout()
  }
}
