import { Component, OnInit } from '@angular/core';
import { Select } from 'src/app/modules/dynamic-controls/components/select/select.model';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { State, allPlants, allDepartments, templateTypes, allTemplates } from 'src/app/app-store';
import { DepartmentActions, TemplateActions, PlantActions } from '@actions/*';
import { Plant } from 'src/app/app-store/models';
import { DynInput } from 'src/app/modules/dynamic-controls/components/input/input.model';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { ListData } from '../list/list.component';
import { Template } from 'src/app/app-store/template/template.model';
import { ConfigurationService } from '../../services/configuration.service';
import { DynSelect } from 'src/app/modules/dynamic-controls/components/dyn-select/dyn-select.model';
import { DynText } from 'src/app/modules/dynamic-controls/components/dyn-text/dyn-text.model';

@Component({
  selector: 'app-config-template',
  templateUrl: './config-template.component.html',
  styleUrls: ['./config-template.component.scss']
})
export class ConfigTemplateComponent implements OnInit {
  isShowPanels: { [key: string]: boolean } = {};
  preConfig = [
    new DynSelect({
      controlId: 'plantId',
      type: 'select',
      label: 'Plant',
      validators: { required: true },
      options: [],
      placeholder: 'Select plant'
    }),
    new DynSelect({
      controlId: 'departmentId',
      type: 'select',
      label: 'Department',
      validators: { required: true },
      options: [],
      placeholder: 'Select department'
    }),
  ];
  list: ListData;
  editingObj: Template;
  preConfigForm: FormGroup;

  configTemplate = [
    new DynText({ controlId: 'name', type: 'text', label: 'Name', validators: { required: true } }),
    new DynText({ controlId: 'description', type: 'text', label: 'Description', validators: { required: true } }),
    new DynSelect({ controlId: 'templateTypeId', type: 'select', label: 'Template Type', options: [], validators: { required: true }, placeholder: 'Select type' }),
  ];

  editOptions = {
    properties: this.configTemplate,
    actType: 'edit',
    objectType: 'template'
  }
  addNewOptions = {
    properties: this.configTemplate,
    actType: 'new',
    objectType: 'template'
  }
  constructor(
    private store: Store<State>,
    private confService: ConfigurationService
  ) { }

  ngOnInit() {
    this.getPlants();
    this.getDepartments();
    this.getTemplateTypes();
    this.getTemplates();
  }
  ngOnDestroy(): void {
    this.store.dispatch(DepartmentActions.clearDepartments());
    this.store.dispatch(TemplateActions.clearTemplates())

  }

  getTemplates() {
    this.store.pipe(
      select(allTemplates)
    ).subscribe((templates: Template[]) => this.list = this.confService.createList(templates, [{ key: 'edit', title: 'Edit' }]))
  }
  getTemplateTypes() {
    this.store.dispatch(TemplateActions.getTemplateTypes());
    this.store.select(templateTypes).subscribe(types => {
      const options = types.map(i => {
        return { value: i.templateTypeId, viewValue: i.name, }
      });
      this.configTemplate.find(i => i.controlId === 'templateTypeId')['options'] = options
    })
  }
  getPlants() {
    let respCount = 0;
    this.store.pipe(
      select(allPlants),
    ).subscribe((plants: Plant[]) => {
      if (plants.length === 0 && respCount === 0) {
        ++respCount;
        this.store.dispatch(PlantActions.loadPlants());
        return;
      };
      this.preConfig[0].options = plants.map(plant => {
        return {
          value: plant.plantId,
          viewValue: `${plant.name} (${plant.code}, ${plant.address})`
        }
      })
    })
  }
  getDepartments() {
    this.store.pipe(
      select(allDepartments)
    ).subscribe(departments => {
      this.preConfig[1].options = departments.map(i => {
        return {
          value: '' + i.departmentId,
          viewValue: `${i.name}`
        }
      })
    })
  }
  getPreConfigForm(e: FormGroup) {
    this.preConfigForm = e;
    e.get('departmentId').disable();
    e.get('plantId').valueChanges.subscribe(value => {
      if (value) {
        e.get('departmentId').enable();
        this.store.dispatch(DepartmentActions.loadDepartments({ plantId: +value }));
        e.get('departmentId').setValue(null)
      } else {
        e.get('departmentId').disable();
      }
    })
    e.get('departmentId').valueChanges.subscribe(value => {
      if (value) {
        this.store.dispatch(TemplateActions.getTemplates({ departmentId: +value }));
      } else {
        this.store.dispatch(TemplateActions.clearTemplates())
      }
    })
  }
  getCurternDateLocal(): string {
    const curternDateUTC = new Date()
    return new Date(curternDateUTC.valueOf() - curternDateUTC.getTimezoneOffset() * 1000 * 60).toJSON().slice(0, -1);
  }
  getTemplateTypeName(templateTypeId): string {
    return this.configTemplate
      .find(i => i.controlId === 'templateTypeId')['options']
      .find(i => i.value == templateTypeId).viewValue
  }

  addObj(e) {
    const departmentId = +this.preConfigForm.value.departmentId
    const template = <Template>{};
    template.name = e.name;
    template.description = e.description;
    template.body = null;
    template.templateTypeId = +e.templateTypeId;
    template.templateTypeName = this.getTemplateTypeName(e.templateTypeId)
    template.lastUpdated = this.getCurternDateLocal();
    this.isShowPanels.add = false;
    this.store.dispatch(TemplateActions.addTemplate({ template, departmentId }))
  }

  updateObj(e) {
    this.isShowPanels.edit = false;
    let template = <Template>{ ...this.editingObj };
    template.name = e.name;
    template.description = e.description;
    template.body = e.body;
    template.templateTypeId = +e.templateTypeId;
    template.templateTypeName = this.getTemplateTypeName(e.templateTypeId)
    template.lastUpdated = this.getCurternDateLocal();
    this.store.dispatch(TemplateActions.updateTemplate({ template }))
  }
  clickListsButton(e) {
    switch (e.action) {
      case 'edit':
        this.editingObj = e.item;
        this.isShowPanels.edit = true;
        break;
      default: break;
    }

  }
}
