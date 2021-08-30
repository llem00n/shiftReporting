import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ApprovalsComponent } from './approvals.component';
import { RouterModule } from '@angular/router';
import { UsedMaterialModule } from '../used-material/used-material.module';
import { DepartmentsModule } from '../departments/departments.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovalCardComponent } from './components/approval-card/approval-card.component';
import { SearchPipePipe } from './pipes/search-pipe.pipe';



@NgModule({
  declarations: [
    ApprovalsComponent, ApprovalCardComponent,SearchPipePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    UsedMaterialModule,
    DepartmentsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ApprovalsModule { }
