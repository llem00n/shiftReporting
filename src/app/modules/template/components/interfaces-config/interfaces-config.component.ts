import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynCheckbox } from 'src/app/modules/dynamic-controls/components/dyn-checkbox/dyn-checkbox.model';
import { Store, select } from '@ngrx/store';
import { State, Interface } from '@models/*';
import { templateInterfaces } from 'src/app/app-store';
import { InterfaseActions } from '@actions/*';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { SettingsFileComponent } from '../settings-file/settings-file.component';
import { SettingsPiafComponent } from '../settings-piaf/settings-piaf.component';
import { SettingsDBComponent } from '../settings-db/settings-db.component';
import { PiafComponent } from 'src/app/modules/piaf/piaf.component';

interface InterfaceSetting {
  key: string;
  title: string;
  icon: string
}
const piafSettings: { [key: string]: InterfaceSetting } = {
  setting1: { key: 'serverName', title: 'Server name', icon: 'server' },
  setting2: { key: 'databaseName', title: 'Database name', icon: 'database' },
};
const piafEFSettings: { [key: string]: InterfaceSetting } = {
  setting1: { key: 'serverName', title: 'Server name', icon: 'server' },
  setting2: { key: 'databaseName', title: 'Database name', icon: 'database' },
  setting3: { key: 'eventFrameTemplateName', title: 'Event frame template name', icon: 'note' },
};
const fileSettings = {
  setting1: { key: 'filePath', title: 'File path', icon: 'folder' },
  setting2: { key: 'fileName', title: 'File name', icon: 'file' }
};
const dbSettings = {
  setting1: { key: 'connectionString', title: 'Connection string', icon: 'table-row' },
  setting2: { key: 'tableName', title: 'Table name', icon: 'table' }
};


export const allInterfaces = {
  'PIAFAttributes': { storage: 'PIAFAttributes', title: 'PIAF attributes', settings: piafSettings, component: PiafComponent, type: 'server-database' },
  'PIAFEventFrames': { storage: 'PIAFTemplate', title: 'PIAF event frames', settings: piafEFSettings, component: PiafComponent, type: 'server-database-template' },
  'Excel': { storage: 'Excel', title: 'Excel', settings: fileSettings, component: SettingsFileComponent },
  'Xml': { storage: 'XML', title: 'Xml', settings: fileSettings, component: SettingsFileComponent },
  'DatabaseTable': { storage: 'DatabaseTable', title: 'Database table', settings: dbSettings, component: SettingsDBComponent },
}

@Component({
  selector: 'app-interfaces-config',
  templateUrl: './interfaces-config.component.html',
  styleUrls: ['./interfaces-config.component.scss']

})
export class InterfacesConfigComponent implements OnInit {
  objectKeys = Object.keys;

  @Input() templateId: number;
  @Input() interfaces: Interface[];
  @Output() changeStatus = new EventEmitter<Interface>();
  @Output() changeSettings = new EventEmitter<Interface>();
  allInterfaces = allInterfaces;

  show = false;
  // interfaces: Interface[] = [];

  constructor(
    private store: Store<State>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.store.dispatch(InterfaseActions.getInterfaces({ templateId: this.templateId }));
    // this.store.pipe(select(templateInterfaces)).subscribe((interfaces: Interface[]) => this.interfaces = interfaces);
  }

  getSettingData(name: string, setting?: string) {
    const iface = this.interfaces.find(i => i.name === name);
    if (!iface) return null;
    if (!setting) return true;
    return iface[setting]
  }

  isChecked(name: string) {
    const iface = this.interfaces.find(i => i.name === name);
    if (!iface) return false;
    return iface.isActive;
  }

  updateSettings(name: string) {
    const iface = this.interfaces.find(i => i.name === name);
    this.openDialog(name, iface)
  }

  updateInterface(name, value) {
    Object.assign(this.interfaces.find(i => i.name === name), value, { updating: true })
  }

  setSettings(name: string) {
    const iface = this.interfaces.find(i => i.name === name);
    if (!iface) { this.openDialog(name); return; }
    const intface = <Interface>{
      ...iface,
      isActive: !iface.isActive,
    };
    this.updateInterface(name, intface)
    // this.store.dispatch(InterfaseActions.updateInterface({ intface, templateId: this.templateId }))
    this.changeStatus.emit(intface);
  }


  openDialog(name, value?): void {
    const dialogRef = this.dialog.open(allInterfaces[name].component, {
      data: {
        value,
        settings: allInterfaces[name].settings,
        type: allInterfaces[name].type,
      },
    });
    dialogRef.afterClosed().subscribe(result => {

      if (!result) return;
      const settings = {};
      Object.keys(allInterfaces[name].settings).map(key => {
        settings[key] = result[allInterfaces[name].settings[key].key];
      })
      const intface = <Interface>{}
      if (!value) {
        Object.assign(intface, settings);
        intface.isActive = true;
        intface.interfaceType = name;
        intface.name = name;
        this.interfaces.push(intface);
        this.updateInterface(name, intface)
        this.changeSettings.emit(intface);
      }
      else {
        Object.assign(intface, value, settings);
        this.updateInterface(name, intface)
        this.changeSettings.emit(intface);
      }
    });
  }
}
