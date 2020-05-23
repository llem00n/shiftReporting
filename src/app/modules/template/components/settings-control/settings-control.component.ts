import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { TemplateBody, DynControl, State, Interface } from '@models/*';
import { Store, select } from '@ngrx/store';
import { templateInterfaces } from 'src/app/app-store';
import { allInterfaces } from '../interfaces-config/interfaces-config.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PiafComponent, PIAFSelector } from 'src/app/modules/piaf/piaf.component';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';

@Component({
  selector: 'app-settings-control',
  templateUrl: './settings-control.component.html',
  styleUrls: ['./settings-control.component.scss']
})
export class SettingsControlComponent implements OnInit {
  result = {
    body: <TemplateBody>{},
    control: {}
  };

  control: DynControl;
  form = new FormGroup({});
  interfacesList = [];
  datasourceValues = { datasource: null }
  isDisableDelete: boolean = true;
  datasourceControls = [{ controlId: 'datasource', label: 'Data source', type: 'textarea', readonly: true }];
  
  constructor(
    private dialog: MatDialog,
    private dataType: DataTypeService,
    public dialogRef: MatDialogRef<SettingsControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      body: TemplateBody,
      control: DynControl,
      interfaces: Interface[]
    },
  ) { }



  ngOnInit(): void {
    this.initialData();
  }

  getEnabledDatasource(): boolean {
    return this.interfacesList.find(i => i.name === 'PIAFEventFrames' || i.name === 'PIAFAttributes')
  }

  getControlForm(form: FormGroup) {
    this.form = form;
    form.valueChanges.subscribe(values => {
      this.result.control = values
    })
  }
  disabledDelete(ifaces, controlId) {
    let controlsId = <string[]>[]
    ifaces.map(iface => {
      const storage = this.data.body[allInterfaces[iface.name].storage];
      if (!storage.hasOwnProperty('Attributes')) return;
      controlsId = controlsId.concat(<string[]>Object.values(storage).filter(key => typeof (key) === 'string'));
      if ((iface.name !== 'PIAFEventFrames')) return;
      controlsId = controlsId.concat(storage['Attributes'].map(i => i.key));
    })

    if (!controlsId.includes(controlId)) this.isDisableDelete = false;
  }

  initialData() {
    if (!this.data.interfaces.length || this.data.control.type === 'label') {
      this.isDisableDelete = false;
      return;
    };
    const attribute = this.data.body['Datasource'].find(i => i.key === this.data.control.controlId);
    if (attribute) this.datasourceValues = { datasource: this.setPiafString(attribute.attributeName) };
    this.disabledDelete(this.data.interfaces, this.data.control.controlId);
    this.interfacesList = this.data.interfaces
      .filter(i => i.isActive)
      .map(i => {
        let checked = false;
        let disabled = false;
        const storage = this.data.body[allInterfaces[i.name].storage];
        if (storage.hasOwnProperty('Attributes')) {
          if (Object.values(storage).includes(this.data.control.controlId)) disabled = true;
          if (
            Object.values(storage).includes(this.data.control.controlId)
            || storage.Attributes.map(i => i.key).includes(this.data.control.controlId)
          ) { checked = true };
        } else {
          if (storage.includes(this.data.control.controlId)) { checked = true }
        }
        if (i.name === 'PIAFEventFrames') disabled = true;
        return {
          name: i.name,
          label: allInterfaces[i.name].title,
          checked,
          disabled,
          info: '',
        };
      })
    // });
  }

  changeInterface(iface) {
    const ifaceStorage = allInterfaces[iface.name].storage
    const storage = this.data.body[ifaceStorage];
    if (storage.hasOwnProperty('Attributes')) {
      if (!this.result.body.hasOwnProperty("PIAFAttributes")) this.result.body["PIAFAttributes"] = { ...storage };
      if (iface.checked) {
        this.result.body["PIAFAttributes"].Attributes = this.result.body["PIAFAttributes"].Attributes.filter(i => i.key !== this.data.control.controlId);
        this.interfacesList.find(i => i.name === "PIAFAttributes").checked = false;
        return;
      }
      const ifase = { ...this.data.interfaces.find(i => i.name === "PIAFAttributes") };
      const data = {
        type: <PIAFSelector>"attribute",
        initialData: {
          serverName: ifase.setting1,
          databaseName: ifase.setting2,
        },
        allowedTypes: this.dataType.getAllowableTypes(this.data.control.type)
      };
      const dialogRef = this.dialog.open(PiafComponent, { data })
      dialogRef.afterClosed().subscribe(res => {
        if (!res) return;
        this.interfacesList.find(i => i.name === "PIAFAttributes").checked = true;
        this.result.body["PIAFAttributes"].Attributes.push({
          key: this.data.control.controlId,
          attributeName: res.path
        })
      })

    } else {
      if (!this.result.body.hasOwnProperty(ifaceStorage)) this.result.body[ifaceStorage] = [...storage]

      if (!iface.checked) {
        this.result.body[ifaceStorage].push(this.data.control.controlId)
        this.interfacesList.find(i => i.name === iface.name).checked = true;
      }
      else {
        this.result.body[ifaceStorage] = this.result.body[ifaceStorage].filter(i => i !== this.data.control.controlId);
        this.interfacesList.find(i => i.name === iface.name).checked = false;
      };
    }
  }

  datasourceClear() {
    if (!this.result.body['Datasource']) this.result.body['Datasource'] = [...this.data.body.Datasource];
    this.result.body['Datasource'] = this.result.body['Datasource'].filter(({ key }) => key !== this.data.control.controlId);
    this.datasourceValues = { datasource: null };
  }
  setDataSource() {
    const dialogRef = this.dialog.open(PiafComponent, {
      data: {
        type: 'server-database-attribute',
        allowedTypes: this.dataType.getAllowableTypes(this.data.control.type)
      }
    })
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      this.result.body['Datasource'] = [...this.data.body.Datasource];
      const attribute = this.result.body['Datasource'].find(i => i.key === this.data.control.controlId);
      this.datasourceValues = { datasource: this.setPiafString(res.path) };
      if (attribute) {
        attribute.attributeName = res.path;
      } else {
        this.result.body['Datasource'].push({
          key: this.data.control.controlId,
          attributeName: res.path
        })
      }
    })
  }
  setPiafString(path: string): string {
    return path ? path.replace(/%5C/g, '\\' + ' ').replace('|', '| ') : '';
  }

}
