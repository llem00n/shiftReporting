import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicControlsModule } from './modules/dynamic-controls/dynamic-controls.module';
import { FormModule } from './modules/form/form.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicControlsModule,
    ReactiveFormsModule,
    FormsModule,
    FormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
