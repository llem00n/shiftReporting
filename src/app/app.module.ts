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
import { MessageModule } from './modules/message/message.module';
import { SnackBarModule } from './modules/snack-bar/snack-bar.module';
import { HeaderComponent } from './components/header/header.component';
import { GridsterModule } from 'angular-gridster2';
import { GridModule } from './modules/grid/grid.module';
import { TemplateModule } from './modules/template/template.module';
import { ScheduleModule } from './modules/schedule/schedule.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicControlsModule,
    // ReactiveFormsModule,
    FormsModule,
    // FormModule,
    ConfigurationModule,
    AppStoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MessageModule,
    // SnackBarModule,
    // GridsterModule,
    GridModule,
    TemplateModule,
    ScheduleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
