import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntryComponent } from './data-entry.component';
import { GridModule } from '../grid';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DataEntryLogComponent } from './components/data-entry-log/data-entry-log.component';



@NgModule({
  declarations: [DataEntryComponent, DataEntryLogComponent],
  imports: [
    CommonModule,
    GridModule,
    UsedMaterialModule
  ]
})
export class DataEntryModule { }
