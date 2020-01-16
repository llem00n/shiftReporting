import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicControlsComponent } from './dynamic-controls.component';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DynamicControlsComponent, InputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    DynamicControlsComponent
  ]
})
export class DynamicControlsModule { }
