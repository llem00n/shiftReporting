import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { DynNumber } from 'src/app/modules/dynamic-controls/components/dyn-number/dyn-number.model';
import { optionsBase } from '../../../grid'
import { FormGroup } from '@angular/forms';

const {
  minCols,
  minRows,
  bgColor
} = optionsBase

@Component({
  selector: 'app-gridster-config',
  templateUrl: './gridster-config.component.html',
  styleUrls: ['./gridster-config.component.scss']
})
export class GridsterConfigComponent implements OnInit {
  @Input() options: { [key: string]: number | string | boolean };
  @Output() form = new EventEmitter<FormGroup>()


  optionsBase = { minCols, minRows, bgColor };
  values;

  show = false;
  gridsterConfig: Map<string, DynControl> = new Map([
    ['minCols', <DynNumber>{ key: 'minCols', type: 'number', label: 'Columns', min: 1, max: 50, step: 1 }],
    ['minRows', <DynNumber>{ key: 'minRows', type: 'number', label: 'Rows', min: 1, max: 50, step: 1 }],
    ['bgColor', <DynControl>{ key: 'bgColor', type: 'color', label: "Background color" }],
  ]);

  constructor() { }

  ngOnInit(): void {
    this.values = Object.assign(this.optionsBase, this.options)
  }
  ngOnChanges(): void {
    this.values = this.options;
  }
}
