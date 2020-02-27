import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
// import { DboardItem } from '../grid/grid.component';
import { DynText } from '../dynamic-controls/components/dyn-text/dyn-text.model';
import { Template } from 'src/app/app-store/template/template.model';
import { FormGroup } from '@angular/forms';
import { dynComponents } from '../dynamic-controls';
import { GridsterItem } from 'angular-gridster2';
import { DynControl } from '../dynamic-controls/models';

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
  selectedControl: DynControl;
  // dashboard1: DynControl[] = [1,
  //   //  2, 3, 4, 5
  // ].map(num => {
  //   const gridItem = { x: 1, rows: 1, cols: 5, y: num };
  //   return new DynText({ gridItem, controlId: `text${num}`, placeholder: `Item ${num}` });
  // });

  modelNewControl = null;
  isShowTemplateInfo = true
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
    // this.template.body.dashboard = this.dashboard1
    this.dashboard = this.template.body.dashboard
    console.log(this.template);
  }
  goBack() {
    this.location.back()
  }
  dropNewItem(itemOptions): void {
    this.dashboard.push(this.createNewControl(itemOptions, this.dashboard));
  }

  createNewControl(gridItem, dashboard): DynControl {
    gridItem.cols = this.getMaxColsS(gridItem, dashboard)
    return new this.modelNewControl({ gridItem });
  }

  getMaxColsS(newItem: GridsterItem, dboard: DynControl[]): number {
    const dboardGridster = dboard.map(i => i.gridItem);
    let maxLength = 5; /* maxLength - length of new element */
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



  clickItem(controlId) {
    if (controlId === this.selectedControl?.controlId) { this.selectedControl = null; } else {
      this.selectedControl = this.template.body.dashboard
        .find(i => i.controlId === controlId)
    }
  }

  dashboardChange(event) {
    console.log(event);
  }
  setTypeNewControl(key) {
    this.modelNewControl = dynComponents.getModel(key);
  }

  removeExcessProps(obj: {}, props: string[]) {
    props.map(prop => delete obj[prop])
  }
  save() {
    const savedTemplate: Template = JSON.parse(JSON.stringify(this.template))
    savedTemplate.body.dashboard.map(i => {
      this.removeExcessProps(i, ['diffGridItem', 'settings']);
      this.removeExcessProps(i.gridItem, ['maxItemCols', 'maxItemRows', 'resizeEnabled']);
    })
    console.log(savedTemplate);
  }
}
