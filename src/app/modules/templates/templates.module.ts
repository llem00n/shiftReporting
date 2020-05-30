import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplateCardComponent } from './components/template-card/template-card.component';
import { RouterModule } from '@angular/router';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DepartmentsModule } from '../departments/departments.module';



@NgModule({
  declarations: [TemplatesComponent, TemplateCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    UsedMaterialModule,
    DepartmentsModule
  ]
})
export class TemplatesModule { }
