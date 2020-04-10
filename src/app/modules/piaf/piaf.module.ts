import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiafComponent } from './piaf.component';
import { PiafListComponent } from './components/piaf-list/piaf-list.component';
import { PiafTreeComponent } from './components/piaf-tree/piaf-tree.component';
import { ButtonLineComponent } from './components/button-line/button-line.component';
import { UsedMaterialModule } from '../used-material/used-material.module';



@NgModule({
  declarations: [
    PiafComponent,
    PiafListComponent,
    PiafTreeComponent,
    ButtonLineComponent

  ],
  imports: [
    CommonModule,
    UsedMaterialModule
  ]
})
export class PiafModule { }
