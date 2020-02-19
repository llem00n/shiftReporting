import { Component, OnInit } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.scss']
})
export class GeneralConfigComponent implements OnInit {

  generalConfig: Map<string, DynControl> = new Map([
    ['name', <DynControl>{ key: 'name', type:'text', placeholder: "Name", label: 'Name'}],
    ['type', <DynControl>{ key: 'type', type:'select', placeholder: "Select type", label: "Type"}],    
  ]);
  constructor() { }
  ngOnInit(): void {
  }
}
