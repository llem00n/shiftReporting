import { Component, OnInit, Input } from '@angular/core';
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

interface InterfaceSetting {
  title: string;
  icon: string
}
const piafSettings: { [key: string]: InterfaceSetting } = {
  setting1: { title: 'Server name', icon: 'server' },
  setting2: { title: 'Database name', icon: 'database' },
};
const fileSettings = {
  setting1: { title: 'File path', icon: 'folder' },
  setting2: { title: 'File name', icon: 'file' }
};
const dbSettings = {
  setting1: { title: 'Connection string', icon: 'table-row' },
  setting2: { title: 'Table name', icon: 'table' }
};


const allInterfaces = {
  'PIAFAttributes': { title: 'PIAF attributes', settings: piafSettings, component: SettingsPiafComponent },
  'PIAFEventFrames': { title: 'PIAF event frames', settings: piafSettings, component: SettingsPiafComponent },
  'Excel': { title: 'Excel', settings: fileSettings, component: SettingsFileComponent },
  'Xml': { title: 'Xml', settings: fileSettings, component: SettingsFileComponent },
  'DatabaseTable': { title: 'Database table', settings: dbSettings, component: SettingsDBComponent },
}

@Component({
  selector: 'app-interfaces-config',
  templateUrl: './interfaces-config.component.html',
  styleUrls: ['./interfaces-config.component.scss']

})
export class InterfacesConfigComponent implements OnInit {
  objectKeys = Object.keys;

  @Input() templateId: number;

  allInterfaces = allInterfaces;

  show = false;
  interfaces: Interface[] = [];

  constructor(
    private store: Store<State>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(InterfaseActions.getInterfaces({ templateId: this.templateId }));
    this.store.pipe(select(templateInterfaces)).subscribe((interfaces: Interface[]) => this.interfaces = interfaces);
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
  setSettings(name: string) {
    const iface = this.interfaces.find(i => i.name === name);
    if (!iface) { this.openDialog(name); return; }
    const intface = <Interface>{
      ...iface,
      isActive: !iface.isActive,
    };
    this.store.dispatch(InterfaseActions.updateInterface({ intface, templateId: this.templateId }))

  }

  openDialog(interfaceType, value?): void {
    const dialogRef = this.dialog.open(allInterfaces[interfaceType].component, {
      data: {
        value,
        settings: allInterfaces[interfaceType].settings
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (!value) {
        const intface = <Interface>{
          ...result,
          interfaceType,
          name: interfaceType,
          isActive: true,
        };
        this.store.dispatch(InterfaseActions.addInterface({ intface, templateId: this.templateId }))
      }
      else {
        const intface = <Interface>{}
        Object.assign(intface, value, result);
        this.store.dispatch(InterfaseActions.updateInterface({ intface, templateId: this.templateId }))
      }
    });
  }
}
