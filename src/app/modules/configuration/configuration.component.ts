import { Component, OnInit } from '@angular/core';
import { ConfigPlantsComponent } from './components/config-plants/config-plants.component';
import { ConfigDepartmentsComponent } from './components/config-departments/config-departments.component';
import { ConfigShiftComponent } from './components/config-shift/config-shift.component';
import { ConfigScheduleComponent } from './components/config-schedule/config-schedule.component';
import { ConfigTemplateComponent } from './components/config-template/config-template.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  isShow: string = null;
  config = [
    { key: 'plant', component: ConfigPlantsComponent, title: 'Plants configuration', isShow: false },
    { key: 'department', component: ConfigDepartmentsComponent, title: 'Departments configuration', isShow: false },
    { key: 'shift', component: ConfigShiftComponent, title: 'Shifts configuration', isShow: false },
    { key: 'schedule', component: ConfigScheduleComponent, title: 'Schedule configuration', isShow: false },
    { key: 'template', component: ConfigTemplateComponent, title: 'Template configuration', isShow: false },
  ];

  showItemPanel(key) {
    this.isShow = this.isShow === key ? null : key;
  }
  
}

