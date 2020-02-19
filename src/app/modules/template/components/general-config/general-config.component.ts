import { Component, OnInit } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { DynTextarea } from 'src/app/modules/dynamic-controls/components/dyn-textarea/dyn-textarea.model';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.scss']
})
export class GeneralConfigComponent implements OnInit {

  generalConfig: Map<string, DynControl> = new Map([
    ['name', <DynControl>{ key: 'name', type:'text', placeholder: "Name", label: 'Name'}],
    ['type', <DynControl>{ key: 'type', type:'select', placeholder: "Select type", label: "Type"}],    
    ['description', <DynTextarea>{ key: 'type', type:'textarea', placeholder: "Description", label: "Description"}],    
  ]);
  constructor() { }
  ngOnInit(): void {
  }
}
