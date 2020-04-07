import { Component, OnInit } from '@angular/core';
import { DataEntry, State, DynControl, User } from '@models/*';
import { Store, select } from '@ngrx/store';
import { currentDataEntry } from 'src/app/app-store';
import { take, switchMap, tap, mergeMap, map, filter } from 'rxjs/operators';
import { GridsterOptions } from '../grid';
import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { DataEntryActions } from '@actions/*';
import { AuthorizationService, CurrentUser } from '../authorization/authorization.service';
import { MessageService } from '../message/sevices/message.service';
import { DateService } from 'src/app/services/date/date.service';
import { DialogService } from '../dialog/dialog.service';
import { Location } from '@angular/common';


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
  values: {}
  form: FormGroup;
  user: User
  isUpdating = false;
  isSubmitted = true;

  constructor(
    private store: Store<State>,
    private authService: AuthorizationService,
    private message: MessageService,
    private dateService: DateService,
    private dialog: DialogService,
    private location: Location,

  ) { }

  ngOnInit(): void {
    this.getDataEntry();
  }
  getDataEntry() {
    const opt = <DataEntry>{};
    this.store.pipe(
      select(currentDataEntry),
      // take(1),
      filter(data => {
        if (data?.template?.body) return true;
        this.message.alertMessage('This template has no controls. You need to set up controls to use the template');
        return false;
      }),
      tap(dataEntry => Object.assign(opt, dataEntry)),
      mergeMap(_ => this.authService.getCurrentUser()),
      // take(1),
      filter(data => !!data),
      map((user: CurrentUser) => {
        opt.modifiedUserId = user.user.userId;
        return opt;
      }),
      switchMap(opt => {                    
        this.isUpdating = opt.createDate ? true : false;
        this.isSubmitted = opt.submitDate ? true : false;
        this.dataEntry = new DataEntry(opt);
        this.dataEntry.dataEntryId ?? delete this.dataEntry.dataEntryId;
        this.dashboard = <DynControl[]>this.dataEntry.template.body?.dashboard || [];
        this.options = this.dataEntry.template.body?.gridsterOptions || {};
        // this.values = {}
        this.values = this.dataEntry.template.body?.templateDataKV || {};
        this.form = this.createForm(this.dashboard);
        // Object.assign(this.dataEntry.template.body['TemplateData'], this.form.value)
        this.dataEntry.template.body['templateDataKV'] = this.form.value;
        return this.form.valueChanges;
      }),
      tap(values => this.dataEntry.template.body['templateDataKV'] = values)
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
    this.location.back()
  }
  addDataEntry() {

    this.dataEntry.createDate = this.dateService.getCurternDateLocal();
    // console.log(this.dataEntry);
    
    this.store.dispatch(DataEntryActions.addDataEntry({ dataEntry: this.dataEntry }))
  }

  updateDataEntry() {
    // console.log(this.dataEntry);

    this.store.dispatch(DataEntryActions.updateDataEntry({ dataEntry: this.dataEntry }));
  }

  submitDataEntry() {
    this.dataEntry.submitDate = this.dateService.getCurternDateLocal();
    this.store.dispatch(DataEntryActions.submitDataEntry({ dataEntry: this.dataEntry }))
  }
}

