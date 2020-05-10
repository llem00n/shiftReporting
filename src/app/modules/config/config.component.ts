import { Component, OnInit } from '@angular/core';
import { State, DynControl } from '@models/*';
import { Store, select } from '@ngrx/store';
import { configurations } from 'src/app/app-store';
import { Configuration } from 'src/app/app-store/configuration/configuration.model';
import { tap } from 'rxjs/operators';
import { DataTypeService } from 'src/app/services/data-type/data-type.service';
import { FormGroup } from '@angular/forms';
import { ConfigurationsActions } from '@actions/*';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  configurations: Configuration[];
  controls: DynControl[];
  values: {}
  form = new FormGroup({});
  forms = [];
  result;
  constructor(
    private store: Store<State>,
    private dataTypeService: DataTypeService,
  ) { }

  ngOnInit(): void {
    this.store.pipe(
      select(configurations),
      tap(config => this.configurations = config),
      tap(c => {
        this.result = [];
        const { controls, values } = this.createControlList(c);
        this.controls = controls;
        this.values = values;
      })
    ).subscribe()
  }

  save() {
    this.store.dispatch(ConfigurationsActions.updateConfigurations({ configurations: this.result }))
  }

  getForm(e) {
    this.forms.push(e);
    if (this.forms.length !== this.controls.length) return;
    const observes = [];
    this.forms.map((f, id) => {
      f.valueChanges.subscribe(value => this.setResult(value))
    })
  }

  setResult(value) {
    this.result.find(i => i.configurationId == Object.keys(value)).value = Object.values(value)[0];
  }

  createControlList(config: Configuration[]) {
    const controls = [];
    const values = {}
    config.map(c => {
      const control = <DynControl>{}
      control.type = this.dataTypeService.getAllowableControls(c.valueType)[0];
      control.label = c.propertyName;
      control.controlId = c.configurationId + '';
      control['description'] = c.propertyDescription
      values[control.controlId] = c.value;
      this.result.push({
        configurationId: c.configurationId,
        value: c.value
      })
      controls.push(control);
    })
    return { controls, values };
  }
}
