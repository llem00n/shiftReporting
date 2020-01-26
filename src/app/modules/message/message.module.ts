import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './message.component';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [LoadingComponent, MessageComponent, ErrorComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    MessageComponent
  ]
})
export class MessageModule { }
