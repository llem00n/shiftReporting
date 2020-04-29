import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/authorization/guards/auth.guard';
import { CalendarComponent } from './modules/calendar/calendar.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { ConfigPlantsComponent } from './modules/plants/components/config-plants/config-plants.component';
import { ConfigDepartmentsComponent } from './modules/configuration/components/config-departments/config-departments.component';
import { ConfigShiftComponent } from './modules/configuration/components/config-shift/config-shift.component';
import { ConfigScheduleComponent } from './modules/configuration/components/config-schedule/config-schedule.component';
import { TemplateComponent } from './modules/template/template.component';
import { TemplatesComponent } from './modules/templates/templates.component';
import { DataEntryComponent } from './modules/data-entry/data-entry.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { ShiftsComponent } from './modules/shifts/shifts.component';
import { SchedulesComponent } from './modules/schedules/schedules.component'
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [

  {
    path: 'configuration',
    // component: ConfigurationComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'plants', component: ConfigPlantsComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'shifts', component: ShiftsComponent },
      { path: 'schedules', component: SchedulesComponent },
      { path: 'templates', component: TemplatesComponent },
      { path: 'templates/:id', component: TemplateComponent },
      { path: 'users', component: UsersComponent },
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
