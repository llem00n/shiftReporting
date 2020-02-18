import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { GridsterModule } from 'angular-gridster2';



@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    GridsterModule
  ]
})
export class GridModule { }
