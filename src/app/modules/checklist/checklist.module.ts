import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistEditorComponent } from './components/checklist-editor/checklist-editor.component';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { FormsModule } from '@angular/forms';
import { ChecklistDataEntryComponent } from './components/checklist-data-entry/checklist-data-entry.component';


@NgModule({
  declarations: [
    ChecklistEditorComponent,
    ChecklistDataEntryComponent
  ],
  imports: [
    CommonModule,
    UsedMaterialModule,
    FormsModule,
  ]
})
export class ChecklistModule { }
