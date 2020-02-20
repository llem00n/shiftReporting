import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { GridsterModule } from 'angular-gridster2';
import { DynamicControlsModule } from '../dynamic-controls/dynamic-controls.module';



@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    GridsterModule,
    DynamicControlsModule
  ],
  exports: [
    GridComponent,
  ]
})
export class GridModule { }
