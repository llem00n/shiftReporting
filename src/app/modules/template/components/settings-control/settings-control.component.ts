import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { TemplateBody, DynControl, State, Interface } from '@models/*';
import { Store, select } from '@ngrx/store';
import { templateInterfaces } from 'src/app/app-store';
import { allInterfaces } from '../interfaces-config/interfaces-config.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PiafComponent } from 'src/app/modules/piaf/piaf.component';

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
  interfaces = [];
  datasourceValues = { datasource: null }

  datasourceControls = [{ controlId: 'datasource', label: 'Data source', type: 'textarea', readonly: true }];
  interfacesControls = [
    // { controlId: 'datasource', label: 'Datasource', type: 'checkbox', readonly: true }
  ]


  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<SettingsControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      body: TemplateBody,
      controlId: string,
    },
  ) { }



  ngOnInit(): void {
    this.initialData();
  }

  getControlForm(event) {
    console.log(event);
  }

  initialData() {
    // initial Datasource
    const attribute = this.data.body['Datasource'].find(i => i.key === this.data.controlId);
    if (attribute) this.datasourceValues = { datasource: attribute.attributeName };
    //  Initial control
    this.control = this.data.body.dashboard.find(i => i.controlId === this.data.controlId);
    //  initial interfaces
    this.store.pipe(select(templateInterfaces)).subscribe((interfaces: Interface[]) => {
      this.interfaces = interfaces
        .filter(i => i.isActive)
        .map(i => {
          let checked = false;
          let disabled = true;
          const storage = this.data.body[allInterfaces[i.name].storage];
          if (i.name !== 'PIAFEventFrames') disabled = false;
          if (storage.hasOwnProperty('Attributes')) {
            if (
              Object.values(storage).includes(this.data.controlId)
              || storage.Attributes.map(i => i.key).includes(this.data.controlId)
            ) { checked = true; disabled = true };
          } else {
            if (storage.includes(this.data.controlId)) { checked = true }
          }
          return {
            name: i.name,
            label: allInterfaces[i.name].title,
            checked,
            disabled,
            info: '',
          };
        })
    });

  }

  changeInterface(e: MatCheckboxChange) {
    const storage = this.data.body[allInterfaces[e.source.name].storage];
    if (storage.hasOwnProperty('Attributes')) {
      if (!this.result.body.hasOwnProperty(e.source.name)) {
        this.result.body[e.source.name] = { ...storage };
      }
      if (!e.checked) {
        this.result.body[e.source.name] = this.result.body[e.source.name].filter(i => i.key !== this.data.controlId);
        return;
      }
    } else {
      if (!this.result.body.hasOwnProperty(e.source.name)) {
        this.result.body[e.source.name] = [...storage];
      }
      if (e.checked) this.result.body[e.source.name].push(this.data.controlId)
      else this.result.body[e.source.name] = this.result.body[e.source.name].filter(i => i !== this.data.controlId);
    }
  }

  datasourceClear() {
    if (!this.result.body['Datasource']) this.result.body['Datasource'] = [...this.data.body.Datasource];
    this.result.body['Datasource'] = this.result.body['Datasource'].filter(({ key }) => key !== this.data.controlId);
    this.datasourceValues = { datasource: null };
  }
  setDataSource() {
    const dialogRef = this.dialog.open(PiafComponent, { data: { type: 'server-db-attribute', allowedTypes: ["System.String"] } })
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return;
      console.log(res);
      this.result.body['Datasource'] = [...this.data.body.Datasource];
      const attribute = this.result.body['Datasource'].find(i => i.key === this.data.controlId);
      this.datasourceValues = { datasource: res.path };
      if (attribute) {
        attribute.attributeName = res.path;
      } else {
        this.result.body['Datasource'].push({
          key: this.data.controlId,
          attributeName: res.path
        })
      }
    })
  }
}
