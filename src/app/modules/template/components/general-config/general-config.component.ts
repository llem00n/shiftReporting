import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Template } from 'src/app/app-store/template/template.model';
import { Store } from '@ngrx/store';
import { State, templateTypes } from 'src/app/app-store';
import { TemplateActions } from '@actions/*';
import { DynText, DynSelect, DynTextarea, DynDate, Schedule, BaseControl } from '@models/*';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html',
  styleUrls: ['./general-config.component.scss']
})
export class GeneralConfigComponent implements OnInit {
  @Input() template: Template;
  @Output() form = new EventEmitter<FormGroup>()

  @Input()
  set checkedSchedules(schedules: number[]) {
    const schedulesSelect = this.generalConfig.find(x => x.controlId == 'schedules');
    schedulesSelect['selectValue'] = schedules;
    this.schedulesControl.subscribe(control => control && control.setValue(schedules));
  }
  @Output() onCheck = new EventEmitter<number>();
  @Output() onUncheck = new EventEmitter<number>();

  @Input() 
  set schedules(schedules: Schedule[]) {
    const schedulesSelect = this.generalConfig.find(x => x.controlId == 'schedules');
    schedulesSelect['options'] = schedules.map(x => ({value: x.scheduleId, viewValue: x.shiftName + ' schedule'}));
  }

  show = false;
  schedulesControl = new BehaviorSubject<AbstractControl>(null);

  // generalConfig = new Map([
  //   ['name', { key: 'name', type: 'text', placeholder: "Name", label: 'Name', validators: { required: true } }],
  //   ['templateTypeId', { key: 'templateTypeId', type: 'select', placeholder: "Select type", label: "Type", options: [], validators: { required: true } }],
  //   ['description', { key: 'type', type: 'textarea', placeholder: "Description", label: "Description" }],
  // ]);
  generalConfig = [
    new DynText({ controlId: 'name', type: 'text', placeholder: "Name", label: 'Name', validators: { required: true } }),
    new DynSelect({ controlId: 'templateTypeId', type: 'select', placeholder: "Select type", label: "Type", options: [], validators: { required: true } }),
    new DynDate({ controlId: 'validFromDate', label: "Valid from date", validators: { required: true } }),
    new DynDate({ controlId: 'validToDate', label: "Valid to date", validators: { required: true } }),
    new DynTextarea({ controlId: 'description', type: 'textarea', placeholder: "Description", label: "Description" }),
    new DynSelect({ controlId: 'schedules', label: 'Schedules', options: [], multiple: true, selectValue: []}),
  ];

  constructor(
    private store: Store<State>
  ) { }
  ngOnInit(): void {
    this.getTemplateTypes();
  }
  getTemplateTypes() {
    this.store.dispatch(TemplateActions.getTemplateTypes());
    this.store.select(templateTypes).subscribe(types => {
      const options = types.map(i => {
        return { value: i.templateTypeId, viewValue: i.name, }
      });
      this.generalConfig.find(c => c.controlId === 'templateTypeId')['options'] = options
    })
  }
  getForm(e: FormGroup) {
    e.addControl('templateTypeName', new FormControl(this.template.templateTypeName))
    e.get('templateTypeId').valueChanges.subscribe(id =>
      (id === 0 || id) && e.get('templateTypeName').setValue(this.getTemplateTypeName(id))
    )
    this.schedulesControl.next(e.get('schedules'));
    this.form.emit(e);
  }
  getTemplateTypeName(templateTypeId): string {
    return this.generalConfig
      .find(c => c.controlId === 'templateTypeId')['options']
      .find(i => i.value == templateTypeId).viewValue
  }
}
