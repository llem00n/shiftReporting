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
    ['PIAFTemplate', <DynControl>{ key: 'PIAFTemplate', type:'checkbox', label: 'PIAF Template'}],
    ['PIAFAttributes', <DynControl>{ key: 'PIAFAttributes', type:'checkbox', label: 'PIAF Attributes'}],
    ['XML', <DynControl>{ key: 'XML', type:'checkbox', label: "XML"}],    
    ['Excel', <DynControl>{ key: 'Excel', type:'checkbox', label: "Excel"}],    
    ['DatabaseTable', <DynControl>{ key: 'DatabaseTable', type:'checkbox', label: "Database Table"}],    
  ]);
  constructor() { }

  ngOnInit(): void {
  }

}
