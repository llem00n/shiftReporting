import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { GeneralConfigComponent } from './components/general-config/general-config.component';
import { FormModule } from '../form/form.module';



@NgModule({
  declarations: [TemplateComponent, GeneralConfigComponent],
  imports: [
    CommonModule,
    FormModule
  ]
})
export class TemplateModule { }
