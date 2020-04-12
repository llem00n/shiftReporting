import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Template } from 'src/app/app-store/template/template.model';
import { FormGroup } from '@angular/forms';
import { DynControl } from '../dynamic-controls/models';
import { Store, select } from '@ngrx/store';
import { State, editingTemplate } from 'src/app/app-store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Interface } from '@models/*';
import { DashboardService } from './services/dashboard.service';
import { DateService } from 'src/app/services/date/date.service';
import { GridsterOptions } from '../grid';
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
  options: GridsterOptions = {};
  appointment = 'build';
  selectedControl: DynControl;
  newControlType: string = null;
  isShowTemplateInfo = true
  title: string = 'Create template';
  saveButton: string = 'Add';
  formGrinsterOptions: FormGroup;

  options$: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private store: Store<State>,
    private dashboardService: DashboardService,
    private dateService: DateService,
    // private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.options$ = this.dashboardService.getOptions().subscribe(options => {
      if (!options || !this.template) return;
      this.template.body.gridsterOptions = options
      this.options = options;
      this.formGrinsterOptions
    })

    this.store.pipe(
      select(editingTemplate),
    ).subscribe(template => {
      if (!template) {
        this.router.navigate(['configuration/templates']);
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
      this.dashboard = this.dashboardService.createDashboard(this.template.body.dashboard);
      this.template.body.dashboard = this.dashboard
      this.dashboardService.setOptions(this.template.body.gridsterOptions)
      // this.options = this.template.body.gridsterOptions;
    })
  }
  ngOnDestroy(): void {
    this.options$.unsubscribe();
  }
  getFormGeneral(e: FormGroup) {
    e.valueChanges.subscribe(value =>
      Object.assign(this.template, value)
    )
  }

  getFormGridsterOptions(e: FormGroup) {
    // console.log(e);

    this.formGrinsterOptions = e
    e.valueChanges.subscribe((values) => {
      this.dashboardService.setOptions(values);
      // this.options = this.template.body.gridsterOptions = new Object(values);
    })
  }

  // createDashboard(dashboard: DynControl[]): DynControl[] {
  //   const result: DynControl[] = [];
  //   dashboard.map(i => {
  //     const model = dynComponents.getModel(i.type);
  //     result.push(new model(i));
  //   });
  //   return result;
  // }

  goBack() {
    this.location.back()
  }
  dropNewItem(gridItem): void {
    this.dashboardService.createNewControl(this.dashboard, gridItem, this.newControlType);
  }

  // createNewControl(gridItem, dashboard): DynControl {
  //   gridItem.cols = this.getMaxColsS(gridItem, dashboard)
  //   return new this.modelNewControl({ gridItem });
  // }
  // getMaxColsS(newItem: GridsterItem, dboard: DynControl[]): number {
  //   const dboardGridster = dboard.map(i => i.gridItem);
  //   let maxLength = 5; /* maxLength - length of new element */
  //   for (let i = 1; i <= maxLength; i++) {
  //     dboardGridster.map(item => {
  //       if (item.x === newItem.x + i
  //         && item.y <= newItem.y
  //         && item.y + item.rows - 1 >= newItem.y) {
  //         maxLength = i;
  //       }
  //     });
  //   }
  //   return maxLength;
  // }
  clickItem(controlId) {
    if (controlId === this.selectedControl?.controlId) { this.selectedControl = null; } else {
      this.selectedControl = this.dashboard
        .find(i => i.controlId === controlId)
    }
  }

  dashboardChange(event) {
    this.dashboardService.setOptions({
      ...this.options,
      minRows: Math.max(this.dashboardService.lastRow(this.dashboard), this.options.minRows),
      minCols: Math.max(this.dashboardService.lastCol(this.dashboard), this.options.minCols),
    })
  }
  setTypeNewControl(key) {
    this.newControlType = key
    // this.newControlType = dynComponents.getModel(key);
  }

  removeExcessProps(obj: {}, props: string[]) {
    props.map(prop => delete obj[prop])
  }

  save() {
    const template: Template = JSON.parse(JSON.stringify(this.template))
    template.body.dashboard.map(i => {
      this.removeExcessProps(i, ['diffGridItem', 'settings', '_settings']);
      this.removeExcessProps(i.gridItem, ['maxItemCols', 'maxItemRows', 'resizeEnabled']);
    })
    template.body.TemplateData = [];
    template.lastUpdated = this.dateService.getCurternDateLocal();

    // console.log(template.body);

    if (this.departmentId) {
      const departmentId = this.departmentId;
      this.store.dispatch(TemplateActions.addTemplate({ template, departmentId }));
    } else {
      template.templateId && this.store.dispatch(TemplateActions.updateTemplate({ template }));
    }
  }
  deleteControl(controlId) {
    const index = this.dashboard.findIndex(i => i.controlId === controlId)
    this.dashboard.splice(index, 1);
  }
  changeStatusInterface(iface: Interface) {
    iface.isActive && this.dashboardService.createControls(this.dashboard, iface, this.template)
    !iface.isActive && this.deleteControls()
    // if (event.name !== 'PIAFAttributes' && event.name !== 'PIAFEventFrames') return;
  }
  changeSettingsInterface(iface: Interface) {
    console.log('settings', event);
    if ((iface.name === 'PIAFAttributes' || iface.name === 'PIAFEventFrames') && iface.isActive) {
      this.deleteControls();
      this.dashboardService.createControls(this.dashboard, iface, this.template);
    }
  }
  // createControls(event) {
  //   console.log('createControls');
  // }
  deleteControls() {
    console.log('deleteControls');
  }

  setRow() {
    console.log(this.options);
    this.dashboardService.setOptions({
      ...this.options,
      minRows: 20,
    })
  }

}

// PIAFEventFrames
// PIAFAttributes
