import { Component, OnInit, Input } from '@angular/core';
import { DynCheckbox } from 'src/app/modules/dynamic-controls/components/dyn-checkbox/dyn-checkbox.model';
import { Store, select } from '@ngrx/store';
import { State, Interface } from '@models/*';
import { templateInterfaces } from 'src/app/app-store';
import { InterfaseActions } from '@actions/*';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { SettingsFileComponent } from '../settings-file/settings-file.component';

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
  'PIAFAttributes': { title: 'PIAF attributes', settings: piafSettings, component: SettingsFileComponent },
  'PIAFEventFrames': { title: 'PIAF event frames', settings: piafSettings, component: SettingsFileComponent },
  'Excel': { title: 'Excel', settings: fileSettings, component: SettingsFileComponent },
  'Xml': { title: 'Xml', settings: fileSettings, component: SettingsFileComponent },
  'DatabaseTable': { title: 'Database table', settings: dbSettings, component: SettingsFileComponent },
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
  // interfacesConfig = [
  //   new DynCheckbox({ controlId: 'PIAFTemplate', type: 'checkbox', label: 'PIAF Template' }),
  //   new DynCheckbox({ controlId: 'PIAFAttributes', type: 'checkbox', label: 'PIAF Attributes' }),
  //   new DynCheckbox({ controlId: 'XML', type: 'checkbox', label: "XML" }),
  //   new DynCheckbox({ controlId: 'Excel', type: 'checkbox', label: "Excel" }),
  //   new DynCheckbox({ controlId: 'DatabaseTable', type: 'checkbox', label: "Database Table" }),
  // ];
  constructor(
    private store: Store<State>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.openDialog({ name: 'test' })
    // console.log(Object.keys(InterfaseTypes));
    console.log(Object.keys(allInterfaces));

    this.store.dispatch(InterfaseActions.getInterfaces({ templateId: this.templateId }));
    this.store.pipe(select(templateInterfaces)).subscribe((interfaces: Interface[]) => this.interfaces = interfaces);
  }

  change(e: MatCheckboxChange) {
    console.log(e.source.name);
    // if (!this.getSettingData(e.source.name)) {
    //   console.log('open dialog');
    // }
  }

  getSettingData(interfaseName: string, settting?: InterfaceSetting) {
    const iface = this.interfaces.find(i => i.name === interfaseName);
    if (!iface) return null;
    if (!settting) return true;
  }

  setSettings(key) {
    console.log('setsetting ', key);
    this.openDialog(key)
  }

  openDialog(interfaceType, value?): void {
    const dialogRef = this.dialog.open(allInterfaces[interfaceType].component, {
      data: {
        value,
        intFace: allInterfaces[interfaceType]
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      if (!value) {
        const intface = <Interface>{
          setting1: null,
          setting2: null,
          setting3: null,
          setting4: null,
          setting5: null,
          ...result,
          interfaceType,
          name: interfaceType,
          isActive: true,
        };
        console.log(intface);
        
        // this.store.dispatch(InterfaseActions.addInterface({ intface, templateId: this.templateId }))
      }
      else {
        const intface = <Interface>{}
        Object.assign(intface, value, result);
        // this.store.dispatch(InterfaseActions.updateInterface({ intface, templateId: this.templateId }))

      }

    });
  }
}
