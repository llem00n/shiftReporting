import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/authorization/guards/auth.guard';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { ConfigPlantsComponent } from './modules/plants/components/config-plants/config-plants.component';
import { ConfigDepartmentsComponent } from './modules/configuration/components/config-departments/config-departments.component';
import { ConfigShiftComponent } from './modules/configuration/components/config-shift/config-shift.component';
import { ConfigScheduleComponent } from './modules/configuration/components/config-schedule/config-schedule.component';
import { ConfigTemplateComponent } from './modules/configuration/components/config-template/config-template.component';
import { UsersConfigComponent } from './modules/users/components/users-config/users-config.component';
import { TemplateComponent } from './modules/template/template.component';
import { TemplatesComponent } from './modules/templates/templates.component';
import { TemplatesListComponent } from './modules/calendar/components/templates-list/templates-list.component';
import { DataEntryComponent } from './modules/data-entry/data-entry.component';


const routes: Routes = [

  {
    path: 'configuration',
    // component: ConfigurationComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'plants', component: ConfigPlantsComponent },
      { path: 'departments', component: ConfigDepartmentsComponent },
      { path: 'shifts', component: ConfigShiftComponent },
      { path: 'schedules', component: ConfigScheduleComponent },
      { path: 'templates', component: TemplatesComponent },
      { path: 'templates/:id', component: TemplateComponent },
      { path: 'users', component: UsersConfigComponent },
    ]
  },
  {
    path: 'calendar', component: CalendarComponent,
    canActivate: [AuthGuard]
  },
  { path: 'dataentry', component: DataEntryComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
