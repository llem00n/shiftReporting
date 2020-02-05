import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, allPlants, allDepartments, allShifts, allSchedules } from 'src/app/app-store';
import { ConfigurationService } from '../../services/configuration.service';
import { Plant } from 'src/app/app-store/models';
import { PlantActions, DepartmentActions, ShiftActions } from '@actions/*';
import { Select } from 'src/app/modules/dynamic-controls/components/select/select.model';
import { FormGroup } from '@angular/forms';
import { DynInput } from 'src/app/modules/dynamic-controls/components/input/input.model';
import { DynDatetime } from 'src/app/modules/dynamic-controls/components/dyn-datetime/dyn-datetime.model';
import { BaseControl } from 'src/app/modules/dynamic-controls/components/base/base.model';

@Component({
  selector: 'app-config-schedule',
  templateUrl: './config-schedule.component.html',
  styleUrls: ['./config-schedule.component.scss']
})
export class ConfigScheduleComponent implements OnInit {
  isShowPanels: { [key: string]: boolean } = {};
  // list: ListData;
  preConfigForm: FormGroup;
  preConfig = [
    <Select>{
      key: 'plantId',
      type: 'select',
      label: 'Plant',
      validators: { required: true },
      options: [],
      placeholder: 'Select plant'
    },
    <Select>{
      key: 'departmentId',
      type: 'select',
      label: 'Department',
      validators: { required: true },
      options: [],
      placeholder: 'Select department'
    },
    <Select>{
      key: 'shiftId',
      type: 'select',
      label: 'Shift',
      validators: { required: true },
      options: [],
      placeholder: 'Select shift'
    },
    // {
    //   key: 'test',
    //   type: 'checkbox',
    //   label: 'Plant',
    //   validators: { required: true },
    // },
  ]
  // editingObj: Shift;

  configSchedule = [
    <DynDatetime>{ key: 'StartTime', type: 'datetime', label: 'Start Time', validators: { required: true } },
    <DynDatetime>{ key: 'EndTime', type: 'datetime', label: 'End Time', validators: { required: true } },
    <BaseControl>{ key: 'checkbox', type: 'checkbox', label: 'checkbox', validators: { required: true } },
  ]

  // editOptions = {
  //   properties: this.configSchedule,
  //   actType: 'edit',
  //   objectType: 'shift'
  // }
  addNewOptions = {
    properties: this.configSchedule,
    actType: 'new',
    objectType: 'schedule'
  }


  constructor(
    private store: Store<State>,
    private confService: ConfigurationService
  ) { }

  ngOnInit() {
    this.getPlants();
    this.getDepartments();
    this.getShifts();
    this.getSchedules();
  }
  // ngOnDestroy() {
  //   this.store.dispatch(DepartmentActions.clearDepartments());
  //   this.store.dispatch(ShiftActions.clearShifts())
  // }
  getPlants() {
    let respCount = 0;
    this.store.pipe(
      select(allPlants),
    ).subscribe((plants: Plant[]) => {
      if (plants.length === 0 && respCount === 0) {
        ++respCount;
        this.store.dispatch(PlantActions.loadPlants());
        return;
      };
      this.preConfig[0].options = plants.map(plant => {
        return {
          value: plant.plantId,
          viewValue: `${plant.name} (${plant.code}, ${plant.address})`
        }
      })
    })
  }
  getDepartments() {
    this.store.pipe(
      select(allDepartments)
    ).subscribe(departments => {
      this.preConfig[1].options = departments.map(i => {
        return {
          value: '' + i.departmentId,
          viewValue: `${i.name}`
        }
      })
    })
  }
  getShifts() {
    this.store.pipe(
      select(allShifts)
    ).subscribe(shifts => {
      this.preConfig[2].options = shifts.map(i => {
        return {
          value: '' + i.shiftId,
          viewValue: `${i.name}`
        }
      })
    })
  }
  getSchedules() {
    this.store.pipe(
      select(allSchedules)
    ).subscribe(console.log)
  }

  // getShifts() {
  //   this.store.pipe(
  //     select(allShifts),
  //   ).subscribe((shifts: Shift[]) => this.list = this.confService.createList(shifts))
  // }
  getPreConfigForm(e: FormGroup) {
    this.preConfigForm = e;
    e.get('departmentId').disable();
    e.get('shiftId').disable();
    e.get('plantId').valueChanges.subscribe(value => {
      if (value) {
        e.get('departmentId').enable();
        this.store.dispatch(DepartmentActions.loadDepartments({ plantId: +value }));
      } else {
        e.get('departmentId').disable();
        e.get('departmentId').setValue(null)
      }
    })
    e.get('departmentId').valueChanges.subscribe(value => {
      if (value) {
        e.get('shiftId').enable();
        this.store.dispatch(ShiftActions.getShifts({ departmentId: +value }));
      } else {
        e.get('shiftId').disable();
        e.get('shiftId').setValue(null)
      }
    })

    // e.get('departmentId').valueChanges.subscribe(value => {
    //   const departmentId = +value;
    //   value && e.get('shiftId').enable();
    //   !value && e.get('shiftId').disable();
    //   e.get('shiftId').setValue(null)
    //   this.store.dispatch(ShiftActions.getShifts({ departmentId }));
    // })



    e.get('shiftId').valueChanges.subscribe(value => {
      if (value) {
        const departmentId = +value;
        // this.store.dispatch(ShiftActions.getShedules({ departmentId }))
      } else {
        this.store.dispatch(ShiftActions.clearShifts())
      }
    })
  }

  // clickListsButton(e) {
  //   console.log(e);
  //   switch (e.action) {
  //     case 'edit':
  //       this.editingObj = e.item;
  //       this.isShowPanels.edit = true;
  //       break;
  //     case 'dlt':
  //       this.store.dispatch(ShiftActions.deleteShift({ id: e.item.shiftId }))
  //       break
  //   }
  // }
  // updateObj(e) {
  //   let shift = { ...this.editingObj }
  //   this.isShowPanels.edit = false;
  //   Object.assign(shift, e);
  //   this.store.dispatch(ShiftActions.updateShift({ shift }))
  // }

  // addObj(e) {
  //   let shift = <Shift>{};
  //   this.isShowPanels.add = false;
  //   Object.assign(shift, this.preConfigForm.value, e);
  //   this.store.dispatch(ShiftActions.addShift({ shift }))
  // }
}
