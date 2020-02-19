import { Component, OnInit } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { DynNumber } from 'src/app/modules/dynamic-controls/components/dyn-number/dyn-number.model';

@Component({
  selector: 'app-gridster-config',
  templateUrl: './gridster-config.component.html',
  styleUrls: ['./gridster-config.component.scss']
})
export class GridsterConfigComponent implements OnInit {
  gridsterConfig: Map<string, DynControl> = new Map([
    ['cols', <DynNumber>{ key: 'columns', type:'number', label: 'Columns'}],
    ['rows', <DynNumber>{ key: 'rows', type:'number', label: 'Rows'}],
    ['bgColor', <DynControl>{ key: 'bgColor', type:'color', label: "Background color"}],    
  ]);

  constructor() { }

  ngOnInit(): void {
  }

}
