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
import { Router } from '@angular/router';
import { TemplateActions } from '@actions/*';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  template: Template;
  departmentId: number;
  dashboard = [];
  options = {};
  appointment = 'build';
  selectedControl: DynControl;
  modelNewControl = null;
  isShowTemplateInfo = true
  title: string = 'Create template';
  saveButton: string = 'Add';


  constructor(
    private location: Location,
    private router: Router,
    private store: Store<State>
  ) { }
  ngOnInit(): void {
    this.store.pipe(
      select(editingTemplate),
    ).subscribe(template => {
      if (!template) {
        this.goBack();
        return;
      }
      let opt = {};
      if (!template._departmentId) {
        this.title = `Edit template ${template.name}`;
        this.saveButton = 'Save';
        opt = template;
      }
      this.departmentId = template._departmentId;
      this.template = new Template(opt);
      this.dashboard = this.createDashboard(this.template.body.dashboard);
      this.template.body.dashboard = this.dashboard
      this.options = this.template.body.gridsterOptions;
    })
  }

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

  createDashboard(dashboard: DynControl[]): DynControl[] {
    const result: DynControl[] = [];
    dashboard.map(i => {
      const model = dynComponents.getModel(i.type);
      result.push(new model(i));
    });
    return result;
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
    // console.log(JSON.stringify(template));
    if (this.departmentId) {
      const departmentId = this.departmentId;
      this.store.dispatch(TemplateActions.addTemplate({ template, departmentId }));
    } else {
      template.templateId && this.store.dispatch(TemplateActions.updateTemplate({ template }));
    }
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
