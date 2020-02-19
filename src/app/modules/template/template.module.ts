import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { GeneralConfigComponent } from './components/general-config/general-config.component';
import { FormModule } from '../form/form.module';
import { GridsterConfigComponent } from './components/gridster-config/gridster-config.component';



@NgModule({
  declarations: [TemplateComponent, GeneralConfigComponent, GridsterConfigComponent],
  imports: [
    CommonModule,
    FormModule
  ]
})
export class TemplateModule { }
