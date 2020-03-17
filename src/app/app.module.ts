import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicControlsModule } from './modules/dynamic-controls/dynamic-controls.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { AppStoreModule } from './app-store/app-store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageModule } from './modules/message/message.module';
import { HeaderComponent } from './components/header/header.component';
import { GridModule } from './modules/grid/grid.module';
import { TemplateModule } from './modules/template/template.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { DataEntryModule } from './modules/data-entry/data-entry.module';
import { DialogModule } from './modules/dialog/dialog.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicControlsModule,
    FormsModule,
    ConfigurationModule,
    AppStoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MessageModule,
    GridModule,
    TemplateModule,
    ScheduleModule,
    DataEntryModule,
    DialogModule,
    AuthorizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
