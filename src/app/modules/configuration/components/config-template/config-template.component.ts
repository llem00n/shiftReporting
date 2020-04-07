import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { State, allPlants, allDepartments, allTemplates } from 'src/app/app-store';
import { DepartmentActions, TemplateActions, PlantActions } from '@actions/*';
import { Plant } from 'src/app/app-store/models';
import { ListData } from '../list/list.component';
import { Template } from 'src/app/app-store/template/template.model';
import { ConfigurationService } from '../../services/configuration.service';
import { DynSelect } from 'src/app/modules/dynamic-controls/components/dyn-select/dyn-select.model';
import { Router } from '@angular/router';

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
  // editingObj: Template;
  preConfigForm: FormGroup;
  templates: Template[];

  constructor(
    private store: Store<State>,
    private confService: ConfigurationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPlants();
    this.getDepartments();
    // this.getTemplateTypes();
    this.getTemplates();
  }
  ngOnDestroy(): void {
    this.store.dispatch(DepartmentActions.clearDepartments());
    // this.store.dispatch(TemplateActions.clearTemplates())
  }

  getTemplates() {
    this.store.pipe(
      select(allTemplates)
    ).subscribe((templates: Template[]) => {
      this.templates = templates;
      this.list = this.confService.createList(templates, [
        { key: 'edit', title: 'Edit' }, { key: 'fillIn', title: 'Fill in' },
      ])
    }
    )
  }
  add() {
    const _departmentId = +this.preConfigForm.value.departmentId;
    this.store.dispatch(TemplateActions.setEditingTemplate({ template: <Template>{ _departmentId } }));
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
  clickListsButton(e) {
    const template = JSON.parse(JSON.stringify(this.templates.find(i => i.templateId === e.item.templateId)));
    this.store.dispatch(TemplateActions.setEditingTemplate({ template }));
    switch (e.action) {
      case 'edit':        
        this.router.navigate([`configuration/templates/${template.templateId}`]);
        break;
      case 'fillIn':
        this.router.navigate(['/dataentry']);
        break;
      default: break;
    }

  }
}
