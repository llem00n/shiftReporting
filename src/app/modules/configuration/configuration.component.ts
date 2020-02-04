import { Component, OnInit } from '@angular/core';
import { ConfigPlantsComponent } from './components/config-plants/config-plants.component';
import { ConfigDepartmentsComponent } from './components/config-departments/config-departments.component';
import { ConfigShiftComponent } from './components/config-shift/config-shift.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  isShow: { [key: string]: boolean } = {};

  config = [
    { key: 'plant', component: ConfigPlantsComponent, title: 'Plants configuration', isShow: false },
    { key: 'department', component: ConfigDepartmentsComponent, title: 'Departments configuration', isShow: false },
    { key: 'shift', component: ConfigShiftComponent, title: 'Shifts configuration', isShow: true },
  ]
  constructor(
  ) { }

  ngOnInit() {
  }
}
