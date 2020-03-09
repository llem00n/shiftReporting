import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntryComponent } from './data-entry.component';
import { GridModule } from '../grid';



@NgModule({
  declarations: [DataEntryComponent],
  imports: [
    CommonModule,
    GridModule
  ]
})
export class DataEntryModule { }
