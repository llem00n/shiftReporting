import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
// import { DboardItem } from '../grid/grid.component';
import { DynText } from '../dynamic-controls/components/dyn-text/dyn-text.model';
import { Template } from 'src/app/app-store/template/template.model';
import { FormGroup } from '@angular/forms';
import { dynComponents } from '../dynamic-controls';
import { GridsterItem } from 'angular-gridster2';
import { DynControl } from '../dynamic-controls/models';
import { Store, select } from '@ngrx/store';
import { State, editingTemplate } from 'src/app/app-store';
import { filter } from 'rxjs/operators';
import { TemplateActions } from '@actions/*';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  // _template = new Template();
  // @Input()
  // set template(template: Template) { if (template) this._template = new Template(JSON.parse(JSON.stringify(template))); };
  // get template() { return this._template };
  template: Template;
  dashboard = [];
  options = {};
  appointment = 'build';
  // options = this.template?.body.gridsterOptions;
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
    private store: Store<State>

  ) { }

  getFormGeneral(e: FormGroup) {
    e.valueChanges.subscribe(value =>
      Object.assign(this.template, value)
    )
  }
  getFormGridsterOptions(e: FormGroup) {
    e.valueChanges.subscribe((values) => {
      this.template.body.gridsterOptions = new Object(values);
      this.options = this.template.body.gridsterOptions;
    })
  }

  ngOnInit(): void {
    this.store.pipe(
      select(editingTemplate),
      // filter(data => !!data),
    ).subscribe(template => {
      const opt = template ? template : {};
      this.template = new Template(opt);
      this.dashboard = this.template.body.dashboard;
      this.options = this.template.body.gridsterOptions;
    })
    // this.template.body.dashboard = this.dashboard1
    // this.dashboard = this.template.body.dashboard
    // console.log(this.template);
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
    const template: Template = JSON.parse(JSON.stringify(this.template))
    template.body.dashboard.map(i => {
      this.removeExcessProps(i, ['diffGridItem', 'settings']);
      this.removeExcessProps(i.gridItem, ['maxItemCols', 'maxItemRows', 'resizeEnabled']);
    })
    template.lastUpdated = this.getCurternDateLocal();
    template.templateId && this.store.dispatch(TemplateActions.updateTemplate({ template }))
    console.log(JSON.stringify(template));
  }
  getCurternDateLocal(): string {
    const curternDateUTC = new Date()
    return new Date(curternDateUTC.valueOf() - curternDateUTC.getTimezoneOffset() * 1000 * 60).toJSON().slice(0, -1);
  }

  deleteControl(controlId) {
    const index = this.dashboard.findIndex(i => i.controlId === controlId)
    this.dashboard.splice(index, 1);
  }

}
// {"templateId":3,"name":"test","templateTypeId":1,"templateTypeName":null,"description":"55qww","lastUpdated":"2020-02-27T16:41:18.791","body":{"TemplateData":{},"PIAFTemplate":{},"PIAFAttributes":{},"XML":[],"Excel":[],"DatabaseTable":[],"Datasource":{},"dashboard":[],"gridsterOptions":{}}}