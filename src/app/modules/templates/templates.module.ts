import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplateCardComponent } from './components/template-card/template-card.component';
import { RouterModule } from '@angular/router';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DepartmentsModule } from '../departments/departments.module';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TemplatesComponent, TemplateCardComponent, SearchPipePipe],
  imports: [
    CommonModule,
    RouterModule,
    UsedMaterialModule,
    DepartmentsModule,
    ReactiveFormsModule,
  ]
})
export class TemplatesModule { }
