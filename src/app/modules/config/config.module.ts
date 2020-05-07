import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { FormModule } from '../form/form.module';



@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    UsedMaterialModule,
    FormModule
  ]
})
export class ConfigModule { }
