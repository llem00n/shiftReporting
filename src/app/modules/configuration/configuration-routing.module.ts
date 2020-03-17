import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { ConfigPlantsComponent } from './components/config-plants/config-plants.component';
import { ConfigDepartmentsComponent } from './components/config-departments/config-departments.component';
import { ConfigShiftComponent } from './components/config-shift/config-shift.component';
import { ConfigScheduleComponent } from './components/config-schedule/config-schedule.component';
import { ConfigTemplateComponent } from './components/config-template/config-template.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children:[
      {
        path: '',
        children: [
          {path: 'plants', component: ConfigPlantsComponent},
          {path: 'departments', component: ConfigDepartmentsComponent},
          {path: 'shifts', component: ConfigShiftComponent},
          {path: 'schedules', component: ConfigScheduleComponent},
          {path: 'templates', component: ConfigTemplateComponent},
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
