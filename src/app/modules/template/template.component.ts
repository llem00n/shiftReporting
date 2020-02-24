import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { DboardItem } from '../grid/grid.component';
import { DynText } from '../dynamic-controls/components/dyn-text/dyn-text.model';
import { Template } from 'src/app/app-store/template/template.model';
import { FormGroup } from '@angular/forms';
import { dynComponents } from '../dynamic-controls';
import { GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  _template = new Template();
  @Input()
  set template(template: Template) { if (template) this._template = new Template(JSON.parse(JSON.stringify(template))); };
  get template() { return this._template };
  dashboard = []
  appointment = 'build';
  options = this.template.body.gridsterOptions;
  // dashboard: DboardItem[] = [1, 2, 3, 4, 5].map(num => {
  //   const control = new DynText({ key: `text${num}`, placeholder: `Item ${num}` });
  //   const gridsterItem = { x: 1, rows: 1, cols: 5, y: num };
  //   Object.assign(gridsterItem, control.gridItemOptions);
  //   return {
  //     key: control.key,
  //     gridsterItem,
  //     control,
  //   }
  // });

  modelNewControl = null;

  constructor(
    private location: Location,
  ) { }

  getFormGeneral(e: FormGroup) {
    e.valueChanges.subscribe(value =>
      Object.assign(this.template, value)
    )
  }
  getFormGridsterOptions(e: FormGroup) {
    e.valueChanges.subscribe((values) =>
      this.template.body.gridsterOptions = new Object(values)
      // Object.assign(this.template.body.gridsterOptions, values)
    )
  }

  ngOnInit(): void {
    this.dashboard = this.template.body.dashboard
    console.log(this.template);
  }
  goBack() {
    this.location.back()
  }
  dropNewItem(itemOptions): void {
    this.dashboard.push(this.createNewControl(itemOptions, this.dashboard));
  }

  createNewControl(itemOptions, dashboard): DboardItem {
    const control = new this.modelNewControl();
    const gridsterItem = { ...itemOptions };
    const maxLength: number = this.getMaxColsS(itemOptions, dashboard, control);
    Object.assign(gridsterItem, control.gridItemOptions, { cols: maxLength });
    return <DboardItem>{
      key: control.key,
      gridsterItem,
      control
    }
  }

  getMaxColsS(newItem: GridsterItem, dboard: DboardItem[], control): number {
    const dboardGridster = dboard.map(i => i.gridsterItem);
    let maxLength = control.gridItemOptions.cols; /* maxLength - length of new element */
    for (let i = 1; i <= maxLength; i++) {
      dboardGridster.map(item => {
        if (item.x === newItem.x + i
          && item.y <= newItem.y
          && item.y + item.rows - 1 >= newItem.y) {
          maxLength = i;
        }
      });
    }
    return maxLength;
  }


  clickItem(event) {
    console.log(event);
  }
  dashboardChange(event) {
    console.log(event);
  }
  setTypeNewControl(key) {
    this.modelNewControl = dynComponents.getModel(key);
  }
}
