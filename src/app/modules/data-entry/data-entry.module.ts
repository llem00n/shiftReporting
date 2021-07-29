import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntryComponent } from './data-entry.component';
import { GridModule } from '../grid';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DataEntryLogComponent } from './components/data-entry-log/data-entry-log.component';
import { MobileEntryFormComponent } from './components/mobile-entry-form/mobile-entry-form.component';
import { DynamicControlsModule } from '../dynamic-controls/dynamic-controls.module';



@NgModule({
  declarations: [DataEntryComponent, DataEntryLogComponent, MobileEntryFormComponent],
  imports: [
    CommonModule,
    GridModule,
    UsedMaterialModule,
    DynamicControlsModule
  ]
})
export class DataEntryModule { }
