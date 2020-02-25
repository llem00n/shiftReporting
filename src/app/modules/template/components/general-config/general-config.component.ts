import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { DynTextarea } from 'src/app/modules/dynamic-controls/components/dyn-textarea/dyn-textarea.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Template } from 'src/app/app-store/template/template.model';
import { DynText } from 'src/app/modules/dynamic-controls/components/dyn-text/dyn-text.model';
import { DynSelect } from 'src/app/modules/dynamic-controls/components/dyn-select/dyn-select.model';
import { Store } from '@ngrx/store';
import { State, templateTypes } from 'src/app/app-store';
import { TemplateActions } from '@actions/*';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.scss']
})
export class GeneralConfigComponent implements OnInit {
  @Input() template: Template;
  @Output() form = new EventEmitter<FormGroup>()

  show = false;

  generalConfig = new Map([
    ['name', { key: 'name', type: 'text', placeholder: "Name", label: 'Name', validators: { required: true } }],
    ['templateTypeId', { key: 'templateTypeId', type: 'select', placeholder: "Select type", label: "Type", options: [], validators: { required: true } }],
    ['description', { key: 'type', type: 'textarea', placeholder: "Description", label: "Description" }],
  ]);
  constructor(
    private store: Store<State>
  ) { }
  ngOnInit(): void {
    this.getTemplateTypes()
  }
  getTemplateTypes() {
    this.store.dispatch(TemplateActions.getTemplateTypes());
    this.store.select(templateTypes).subscribe(types => {
      const options = types.map(i => {
        return { value: i.templateTypeId, viewValue: i.name, }
      });
      this.generalConfig.get('templateTypeId')['options'] = options
    })
  }
  getForm(e: FormGroup) {
    e.addControl('templateTypeName', new FormControl(null))
    e.get('templateTypeId').valueChanges.subscribe(id =>
      (id === 0 || id) && e.get('templateTypeName').setValue(this.getTemplateTypeName(id))
    )
    this.form.emit(e);
  }
  getTemplateTypeName(templateTypeId): string {
    return this.generalConfig
      .get('templateTypeId')['options']
      .find(i => i.value == templateTypeId).viewValue
  }
}
