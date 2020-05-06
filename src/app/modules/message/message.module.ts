import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './message.component';
import { ErrorComponent } from './components/error/error.component';
import { AlertComponent } from './components/alert/alert.component';
// import { AngularSvgIconModule } from 'angular-svg-icon';
import { UsedMaterialModule } from '../used-material/used-material.module';



@NgModule({
  declarations: [LoadingComponent, MessageComponent, ErrorComponent, AlertComponent],
  imports: [
    // AngularSvgIconModule.forRoot(),
    CommonModule,
    UsedMaterialModule
  ],
  exports: [
    MessageComponent
  ]
})
export class MessageModule { }
