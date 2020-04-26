import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsComponent } from './shifts.component';
import { ShiftCardComponent } from './components/shift-card/shift-card.component';
import { ShiftFormComponent } from './components/shift-form/shift-form.component';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';



@NgModule({
  declarations: [ShiftsComponent, ShiftCardComponent, ShiftFormComponent],
  imports: [
    CommonModule,
    UsedMaterialModule,
    ReactiveFormsModule,
    FormModule
  ]
})
export class ShiftsModule { }
