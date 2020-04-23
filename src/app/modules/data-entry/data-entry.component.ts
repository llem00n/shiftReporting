import { Component, OnInit } from '@angular/core';
import { DataEntry, State, DynControl, User, CurrentDataEntry } from '@models/*';
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
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { DataSourceService } from './data-source.service';


@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {

  dataEntry: DataEntry;
  startDate: Date;
  endDate: Date;
  title: string = 'Entry ';
  dashboard: DynControl[] = [];
  options: GridsterOptions = {};
  values: {} = {};
  form: FormGroup;
  user: User
  isSaveEnabled = true;

  getData$: Subscription
  constructor(
    private store: Store<State>,
    private authService: AuthorizationService,
    private message: MessageService,
    private dateService: DateService,
    private location: Location,
    private router: Router,
    private dataSourceService: DataSourceService

  ) { }

  ngOnInit(): void {
    this.getDataEntry();
  }
  ngOnDestroy(): void {
    this.getData$.unsubscribe();
  }
  getDataEntry() {
    const opt = <DataEntry>{};
    this.getData$ = this.store.pipe(
      select(currentDataEntry),
      filter(data => {
        if (!data) {
          this.router.navigate(['/calendar']);
          return;
        }
        if (data.dataEntry.template.body.dashboard.length) return true;
        this.message.alertMessage('This template has no controls. You need to set up controls to use the template');
        return false;
      }),
      tap((cDataEntry: CurrentDataEntry) => {
        Object.assign(opt, cDataEntry.dataEntry);
        this.startDate = cDataEntry.startDate;
        this.endDate = cDataEntry.endDate;
      }),
      mergeMap(_ => this.authService.getCurrentUser()),
      filter(data => !!data),
      map((user: CurrentUser) => {
        opt.modifiedUserId = user.user.userId;
        return opt;
      }),
      switchMap(opt => this.dataSourceService.getDatasources(opt.templateId).pipe(
        map(data => data.map(i => this.values[i.key] = i.value)),
        map(_ => opt),
      )),
      // tap(console.log),
      switchMap(opt => {
        console.log(opt);
        this.dataEntry = new DataEntry(opt);
        this.dataEntry.dataEntryId ?? delete this.dataEntry.dataEntryId;
        this.dashboard = <DynControl[]>this.dataEntry.template.body?.dashboard || [];
        this.options = this.dataEntry.template.body?.gridsterOptions || {};
        // this.values = {}
        Object.assign(this.values, this.dataEntry.template.body?.templateDataKV || {});
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
      if (i.type === 'label') return;
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

  save() {
    console.log(this.dataEntry);
    if (this.dataEntry.dataEntryId) {
      this.store.dispatch(DataEntryActions.updateDataEntry({ dataEntry: this.dataEntry }));
      return;
    }
    this.dataEntry.createDate = this.dateService.getCurternDateLocal();
    this.store.dispatch(DataEntryActions.addDataEntry({ dataEntry: this.dataEntry }))
  }
  // addDataEntry() {
  //   this.dataEntry.createDate = this.dateService.getCurternDateLocal();
  //   this.store.dispatch(DataEntryActions.addDataEntry({ dataEntry: this.dataEntry }))
  // }
  // updateDataEntry() {
  // this.store.dispatch(DataEntryActions.updateDataEntry({ dataEntry: this.dataEntry }));
  // }

  submitDataEntry() {
    this.dataEntry.submitDate = this.dateService.getCurternDateLocal();
    this.store.dispatch(DataEntryActions.submitDataEntry({ dataEntry: this.dataEntry }))
  }
}

