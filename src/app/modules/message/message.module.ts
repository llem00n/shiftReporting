import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    // BrowserAnimationsModule
  ],
  exports: [
    LoadingComponent,
  ]
})
export class MessageModule { }
