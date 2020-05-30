import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { FormModule } from '../form/form.module';
import { DynamicControlsModule } from '../dynamic-controls/dynamic-controls.module';
import { ListComponent } from './components/list/list.component';
import { ConfigDepartmentsComponent } from './components/config-departments/config-departments.component';
import { EditingPanelComponent } from './components/editing-panel/editing-panel.component';
import { ConfigShiftComponent } from './components/config-shift/config-shift.component';
import { ConfigScheduleComponent } from './components/config-schedule/config-schedule.component';
import { ConfigTemplateComponent } from './components/config-template/config-template.component';
import { TileComponent } from './components/tile/tile.component';
import { DialogModule } from '../dialog/dialog.module';
// import { ConfigurationRoutingModule } from './configuration-routing.module';
import { PlantsModule } from '../plants/plants.module';
import { UsersModule } from '../users/users.module';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ConfigurationComponent, ListComponent, ConfigDepartmentsComponent, EditingPanelComponent, ConfigShiftComponent, ConfigScheduleComponent, ConfigTemplateComponent, TileComponent],
  imports: [
    PlantsModule,
    CommonModule,
    FormModule,
    DynamicControlsModule,
    DialogModule,
    // ConfigurationRoutingModule,
    PlantsModule,
    UsersModule,
    UsedMaterialModule,
    RouterModule
  ],
  exports: [ConfigurationComponent]
})
export class ConfigurationModule { }
