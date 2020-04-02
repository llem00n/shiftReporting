import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // form: FormGroup = new FormGroup({});
  isSmall = false;
  config = [
    { key: 'configuration/plants', title: 'Plants', isShow: false, icon: 'factory' },
    { key: 'configuration/departments', title: 'Departments', isShow: false, icon: 'graph-outline' },
    { key: 'configuration/shifts', title: 'Shifts', isShow: false, icon: 'calendar' },
    { key: 'configuration/schedules', title: 'Schedule', isShow: false, icon: 'calendar' },
    { key: 'configuration/templates', title: 'Template', isShow: false, icon: 'alpha-t-box-outline' },
    { key: 'configuration/users', title: 'Users', icon: 'account-group' },
  ];

  constructor() { }


  ngOnInit(): void {
  }

  logout() { }
}
