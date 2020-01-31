import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { Department } from 'src/app/app-store/department/department.model';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editing-panel',
  templateUrl: './editing-panel.component.html',
  styleUrls: ['./editing-panel.component.scss']
})
export class EditingPanelComponent implements OnInit, OnChanges {
  @Input() options: {
    actType?: string,
    properties: DynControl[],
    objectType?: string
  }
  @Input() object: Plant | Department

  @Output() clickOk: EventEmitter<any> = new EventEmitter()
  @Output() clickCancel: EventEmitter<any> = new EventEmitter()

  title: string;
  form: FormGroup;
  actType: string;
  properties: DynControl[];


  constructor() { }

  ngOnInit() {
    this.title = this.getTitle()
  }
  ngOnChanges() {
    this.title = this.getTitle()
    this.actType = this.options.actType || 'new';
    this.properties = this.options.properties;
  }

  getTitle() {
    let title: string;
    switch (this.actType) {
      case 'new':
        title = `Add new ${this.options.objectType || ''}`;
        break;
      case 'edit':
        title = `Edit ${this.options.objectType || ''} (name: ${this.object.name})`;
    }
    return title
  }
  getForm(e: FormGroup) {
    this.form = e;
  }
  disableOkButton(): boolean {	
    let res = this.properties.filter(i => this.object[i.key] !== this.form.value[i.key])	
    return this.form.invalid || res.length === 0	
  }
}
