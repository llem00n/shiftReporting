import { Component, OnInit } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';

@Component({
  selector: 'app-interfaces-config',
  templateUrl: './interfaces-config.component.html',
  styleUrls: ['./interfaces-config.component.scss']
})
export class InterfacesConfigComponent implements OnInit {
  show = false;
  interfacesConfig: Map<string, DynControl> = new Map([
    ['cols', <DynControl>{ key: 'columns', type:'checkbox', label: 'Columns'}],
    ['rows', <DynControl>{ key: 'rows', type:'checkbox', label: 'Rows'}],
    ['bgColor', <DynControl>{ key: 'bgColor', type:'checkbox', label: "Background color"}],    
  ]);
  constructor() { }

  ngOnInit(): void {
  }

}
