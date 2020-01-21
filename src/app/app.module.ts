import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicControlsModule } from './modules/dynamic-controls/dynamic-controls.module';
import { FormModule } from './modules/form/form.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { AppStoreModule } from './app-store/app-store.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    FormModule,
    ConfigurationModule,
    AppStoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
