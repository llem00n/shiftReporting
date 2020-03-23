import { Component, OnInit } from '@angular/core';
// import { ConfigPlantsComponent } from './components/config-plants/config-plants.component';
import { ConfigDepartmentsComponent } from './components/config-departments/config-departments.component';
import { ConfigShiftComponent } from './components/config-shift/config-shift.component';
import { ConfigScheduleComponent } from './components/config-schedule/config-schedule.component';
import { ConfigTemplateComponent } from './components/config-template/config-template.component';
import { UsersConfigComponent } from '../users/components/users-config/users-config.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  isShow: string = null;
  config = [
    {
      key: 'plants',
      //  component: ConfigPlantsComponent,
      title: 'Plants', isShow: false
    },
    { key: 'departments', component: ConfigDepartmentsComponent, title: 'Departments', isShow: false },
    { key: 'shifts', component: ConfigShiftComponent, title: 'Shifts', isShow: false },
    { key: 'schedules', component: ConfigScheduleComponent, title: 'Schedule', isShow: false },
    { key: 'templates', component: ConfigTemplateComponent, title: 'Template', isShow: false },
    { key: 'users', title: 'Users' },
  ];
  showItemPanel(key) {
    this.isShow = this.isShow === key ? null : key;
  }

}

