import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplateCardComponent } from './components/template-card/template-card.component';
import { RouterModule } from '@angular/router';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DepartmentsModule } from '../departments/departments.module';
import { TemplateCopyComponent } from './components/template-copy/template-copy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TemplatesComponent, TemplateCardComponent, TemplateCopyComponent],
  imports: [
    CommonModule,
    RouterModule,
    UsedMaterialModule,
    DepartmentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TemplatesModule { }
