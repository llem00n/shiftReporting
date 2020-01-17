import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { FormModule } from '../form/form.module';
import { DynamicControlsModule } from '../dynamic-controls/dynamic-controls.module';



@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    FormModule,
    DynamicControlsModule
  ],
  exports: [ConfigurationComponent]
})
export class ConfigurationModule { }
