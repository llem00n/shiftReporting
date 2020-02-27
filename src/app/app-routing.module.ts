import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './modules/template/template.component';
import { ConfigurationComponent } from './modules/configuration/configuration.component';


const routes: Routes = [

  { path: 'configuration', component: ConfigurationComponent },
  { path: 'template', component: TemplateComponent },
  { path: '', redirectTo: 'configuration', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
