import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { GridsterItem, GridsterConfig } from 'angular-gridster2';
import { DynControl } from '../dynamic-controls/models';
import { FormGroup } from '@angular/forms';

// export interface DboardItem {
//   key: string;
//   gridsterItem: GridsterItem;
//   control: DynControl;
// }
export interface GridsterOptions extends GridsterConfig {
  bgColor?: string;
}
export const optionsBase: GridsterOptions = {
  bgColor: '#888888',
  gridType: 'fit',
  // setGridSize: true,
  // disableWindowResize: true,
  // keepFixedHeightInMobile: true,
  minCols: 10,
  minRows: 10,
  // maxCols: 50,
  // maxRows: 50,
  fixedColWidth: 40,
  fixedRowHeight: 40,
  margin: 0,
  mobileBreakpoint: 1,
  // pushItems: false,
  // outerMargin: true,
  outerMarginTop: 16,
  outerMarginBottom: 16,
  outerMarginLeft: 16,
  outerMarginRight: 16,
  swap: false,

  resizable: {
    enabled: false,
  }
};


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnChanges {
  @Input() appointment: string;
  @Input() selectedItemId: string;
  @Input() dashboard: DynControl[];
  @Input() options: GridsterOptions = {};
  @Input() form: FormGroup;
  @Input() showInvalid: boolean;
  @Input() controlsErrors //: TemplateDataItem[];

  @Output() clickItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() dropNewItem: EventEmitter<GridsterItem> = new EventEmitter<GridsterItem>();
  @Output() dashboardChange: EventEmitter<DynControl[]> = new EventEmitter<DynControl[]>();

  private _optionsBuild: GridsterConfig = {
    itemChangeCallback: (e, i) => this.gridsterItemChange(e, i),
    emptyCellDropCallback: (e, i) => this.emptyCellDrop(e, i),
    enableEmptyCellDrop: true,
    displayGrid: 'always',
    // displayGrid: 'onDrag&Resize',    
    draggable: {
      delayStart: 0,
      enabled: true,
      dropOverItems: false,
    },
    resizable: {
      enabled: true,
    },
  };
  gridSize: { [key: string]: string } = {}
  isItemChange = false;
  optionsResult: GridsterOptions = {};
  optionsAppointment: GridsterOptions;
  elementErrors//: ElementError[];

  ngOnChanges(): void {
    this.processingOptions(this.appointment);
  }
  processingOptions(appointment: string) {
    const optionsAppointment = appointment === 'build'
      ? this._optionsBuild : {};
    Object.assign(this.optionsResult, optionsBase, optionsAppointment, this.options);
    this.gridSize = this.calcWidthHeight(this.optionsResult, this.dashboard);
    this.changedOptions();
  }
  calcWidthHeight(opt, dashboard: DynControl[]): { [key: string]: string } {
    const {
      fixedColWidth,
      outerMarginLeft,
      outerMarginRight,
      outerMarginTop,
      outerMarginBottom,
    } = opt;
    const result = {}
    let maxX = opt.minCols;
    let maxY = opt.minRows;
    dashboard.map(({ gridItem }) => {
      const x = gridItem.x + gridItem.cols;
      const y = gridItem.y + gridItem.rows;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    });
    result['width'] = (maxX * fixedColWidth + outerMarginLeft + outerMarginRight) + 'px';
    result['height'] = (maxY * fixedColWidth + outerMarginTop + outerMarginBottom) + 'px';
    return result;
  }

  gridsterItemChange(e, i): void {
    this.gridSize = this.calcWidthHeight(this.optionsResult, this.dashboard);
    this.dashboardChange.emit(this.dashboard);
    this.isItemChange = true;
    this.changedOptions();
  }

  itemClick(event, id): void {
    !this.isItemChange && this.clickItem.emit(id);
    this.isItemChange = false;
  }

  changedOptions() {
    if (this.optionsResult.api && this.optionsResult.api.optionsChanged) {
      this.optionsResult.api.optionsChanged();
    }
  }

  emptyCellDrop(event: MouseEvent, item: GridsterItem) {
    this.dropNewItem.emit(item);
  }

  getBackground(dboardItem: DynControl): string {
    return 'white';
    // const data = this.controlsErrors && this.controlsErrors.find(i => i.ControlID === dboardItem.id);
    // return (data && data.HasError)
    //   && 'rgba(255, 140, 140)'
    //   || dboardItem.element.backgroundColor
    //   || 'white';
  }
  getMessageError(dboardItem: DynControl): string {
    return '';
    // const data = this.controlsErrors && this.controlsErrors.find(i => i.ControlID === dboardItem.id);
    // return (data && data.HasError) ? data.ErrorMessage : '';
  }
  // getContent(item) {
  // return `[slot="${item.key}"]`
  // }
}
