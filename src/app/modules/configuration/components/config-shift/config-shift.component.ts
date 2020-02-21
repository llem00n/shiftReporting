import { Component, OnInit } from '@angular/core';
import { ListData } from '../list/list.component';
import { Shift } from 'src/app/app-store/shift/shift.model';
import { select, Store } from '@ngrx/store';
import { State, allShifts } from 'src/app/app-store';
import { ShiftActions } from '@actions/*';
import { ConfigurationService } from '../../services/configuration.service';
import { DynInput } from 'src/app/modules/dynamic-controls/components/input/input.model';

@Component({
  selector: 'app-config-shift',
  templateUrl: './config-shift.component.html',
  styleUrls: ['./config-shift.component.scss']
})
export class ConfigShiftComponent implements OnInit {
  isShowPanels: { [key: string]: boolean } = {};
  list: ListData;
  editingObj: Shift;

  configShift = [
    <DynInput>{ key: 'name', type: 'text', label: 'Name', validators: { required: true } },
    <DynInput>{ key: 'description', type: 'text', label: 'Description' },
  ]

  editOptions = {
    properties: this.configShift,
    actType: 'edit',
    objectType: 'shift'
  }
  addNewOptions = {
    properties: this.configShift,
    actType: 'new',
    objectType: 'shift'
  }


  constructor(
    private store: Store<State>,
    private confService: ConfigurationService
  ) { }

  ngOnInit() {
    this.getShifts()
  }
  ngOnDestroy() {
    this.store.dispatch(ShiftActions.clearShifts())
  }
  getShifts() {
    this.store.dispatch(ShiftActions.getShifts())
    this.store.pipe(
      select(allShifts),
    ).subscribe((shifts: Shift[]) => this.list = this.confService.createList(shifts))
  }

  clickListsButton(e) {
    console.log(e);
    switch (e.action) {
      case 'edit':
        this.editingObj = e.item;
        this.isShowPanels.edit = true;
        break;
      case 'dlt':
        this.store.dispatch(ShiftActions.deleteShift({ id: e.item.shiftId }))
        break
    }
  }
  updateObj(e) {
    let shift = { ...this.editingObj }
    this.isShowPanels.edit = false;
    Object.assign(shift, e);
    this.store.dispatch(ShiftActions.updateShift({ shift }))
  }

  addObj(e) {
    let shift = <Shift>{};
    this.isShowPanels.add = false;
    Object.assign(shift, e);
    this.store.dispatch(ShiftActions.addShift({ shift }))
  }
}
