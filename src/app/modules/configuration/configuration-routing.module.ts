import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { ConfigDepartmentsComponent } from './components/config-departments/config-departments.component';
import { ConfigShiftComponent } from './components/config-shift/config-shift.component';
import { ConfigScheduleComponent } from './components/config-schedule/config-schedule.component';
import { ConfigTemplateComponent } from './components/config-template/config-template.component';
import { ConfigPlantsComponent } from '../plants/components/config-plants/config-plants.component';
import { UsersConfigComponent } from '../users/components/users-config/users-config.component';
import { AuthGuard } from '../authorization/guards/auth.guard';

const routes: Routes = [
  // {
  //   path: 'configuration',
  //   component: ConfigurationComponent,
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],

  //   children: [
  //     { path: 'plants', component: ConfigPlantsComponent },
  //     { path: 'departments', component: ConfigDepartmentsComponent },
  //     { path: 'shifts', component: ConfigShiftComponent },
  //     { path: 'schedules', component: ConfigScheduleComponent },
  //     { path: 'templates', component: ConfigTemplateComponent },
  //     { path: 'users', component: UsersConfigComponent },
  //   ]
  // }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
