import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { DynamicControlsModule } from '../dynamic-controls/dynamic-controls.module';



@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    DynamicControlsModule
  ],
  exports: [
    FormComponent
  ]
})
export class FormModule { }
