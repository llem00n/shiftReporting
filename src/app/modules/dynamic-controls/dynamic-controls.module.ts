import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicControlsComponent } from './dynamic-controls.component';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DynDatetimeComponent } from './components/dyn-datetime/dyn-datetime.component';
import { DynCheckboxComponent } from './components/dyn-checkbox/dyn-checkbox.component';
import { DynNumberComponent } from './components/dyn-number/dyn-number.component';

const MaterialModules = [
  // MatCardModule,
  MatSelectModule,
  MatFormFieldModule,
  // MatButtonModule,
  MatInputModule,
]


@NgModule({
  declarations: [DynamicControlsComponent, InputComponent, SelectComponent, DynDatetimeComponent, DynCheckboxComponent, DynNumberComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModules
  ],
  exports: [
    DynamicControlsComponent
  ]
})
export class DynamicControlsModule { }
