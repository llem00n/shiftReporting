import { Component, OnInit } from '@angular/core';
import { DataEntry, State, DynControl } from '@models/*';
import { Store, select } from '@ngrx/store';
import { editingTemplate } from 'src/app/app-store';
import { take, switchMap, debounceTime, tap } from 'rxjs/operators';
import { GridsterOptions } from '../grid';
import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { DataEntryActions } from '@actions/*';

const dataEntry = {
  "dataEntryID": null, "scheduleID": null, "createDate": null, "submitDate": null, "template": {
    "templateId": 1002, "name": "Yehor_edition", "description": "Test template", "body": {
      "TemplateData": {
        // "select17097a30cfc": "test2", "checkbox17097a3170c": true, "text17097d8fa94": "qwer", "label17097d90622": null
      }, "PIAFTemplate": {}, "PIAFAttributes": {}, "XML": [], "Excel": [], "DatabaseTable": [], "Datasource": {}, "dashboard": [{
        "type": "select", "gridItem": { "cols": 5, "rows": 1, "x": 14, "y": 1 }, "controlId": "select17097a30cfc", "value": null, "label": "", "name": "select", "bgColor": "#ffffff", "isRemovable": true, "options": [{ "value": 'test1', "viewValue": 'test1' }, { "value": 'test2', "viewValue": 'test2' }, { "value": 'test3', "viewValue": 'test3' }], "_settings": [{ "controlId": "placeholder", "label": "Placeholder", "type": "text" }, { "controlId": "optionsString", "label": "Options", "type": "textarea" }], "placeholder": "select"
      }, { "type": "checkbox", "gridItem": { "cols": 1, "rows": 1, "x": 0, "y": 1 }, "controlId": "checkbox17097a3170c", "value": null, "label": "", "name": "", "bgColor": "#ffffff", "isRemovable": true, "valueType": "boolean" }, { "type": "text", "gridItem": { "cols": 5, "rows": 1, "x": 6, "y": 4 }, "controlId": "text17097d8fa94", "value": null, "label": "", "name": "Name", "bgColor": "#ffffff", "isRemovable": true, "valueType": "string", "placeholder": "" }, { "type": "label", "gridItem": { "cols": 5, "rows": 1, "x": 0, "y": 4 }, "controlId": "label17097d90622", "value": "Name", "label": "", "name": "", "bgColor": "#ffffff", "isRemovable": true, "valueType": "string", "_settings": [{ "controlId": "value", "label": "Label", "type": "text" }] }], "gridsterOptions": { "minCols": 12, "minRows": 13, "bgColor": "#587e75" }
    }, "lastUpdated": "2020-03-01T22:46:20.23", "templateTypeId": 1, "templateTypeName": "Shift template"
  }, "submitUser": null
};

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {

  dataEntry: DataEntry;
  title: string = 'Entry ';
  dashboard: DynControl[] = [];
  options: GridsterOptions = {};
  values: { [key: string]: boolean | string | number }
  form: FormGroup;
  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.getTemplate()
  }

  getTemplate() {
    this.store.pipe(
      select(editingTemplate),
      take(1),
      switchMap(template => {
        const opt = <DataEntry>{}
        opt.template = template
        this.dataEntry = new DataEntry(dataEntry);
        this.dashboard = <DynControl[]>this.dataEntry.template.body.dashboard;
        this.values = this.dataEntry.template.body.TemplateData;
        this.form = this.createForm(this.dashboard);
        Object.assign(this.dataEntry.template.body.TemplateData, this.form.value)
        return this.form.valueChanges
      }),
      tap(values => Object.assign(this.values, values))
    ).subscribe()
  }

  createForm(controls: DynControl[]): FormGroup {
    const group = new FormGroup({});
    controls.map(i => {
      if (i.type == 'label') return;
      const validators: ValidatorFn[] = [];
      i.validators && Object.keys(i.validators).map(controlId => {
        if (typeof (i.validators[controlId]) === 'boolean') validators.push(Validators[controlId])
        else validators.push(Validators[controlId](i.validators[controlId]));
      });
      group.addControl(i.controlId, new FormControl(this.setValue(i, this.values), validators));
    });
    return group;
  }

  setValue(control: DynControl, values): string | boolean | number {
    if (!values
      || values[control.controlId] === null
      || values[control.controlId] === undefined) return null;
    switch (control.type) {
      case 'datetime':
        const a = new Date(values[control.controlId])
        return new Date(a.valueOf() - a.getTimezoneOffset() * 1000 * 60).toJSON().slice(0, 16);
      default:
        return values[control.controlId]
    }
  }

  goBack() {
  }
  addDataEntry() {
    const dataEntry: DataEntry = JSON.parse(JSON.stringify(this.dataEntry))
    delete dataEntry.dataEntryId;
    dataEntry.createDate = this.getCurternDateLocal();
    dataEntry.scheduleId = 11; //crutch
    dataEntry.submitUser = 'crutch' //crutch
    this.store.dispatch(DataEntryActions.addDataEntry({ dataEntry }))
  }
  getCurternDateLocal(): string {
    const curternDateUTC = new Date()
    return new Date(curternDateUTC.valueOf() - curternDateUTC.getTimezoneOffset() * 1000 * 60).toJSON().slice(0, -1);
  }
}

