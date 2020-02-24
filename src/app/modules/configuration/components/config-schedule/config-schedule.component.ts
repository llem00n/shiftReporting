import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, allPlants, allDepartments, allShifts, allSchedules } from 'src/app/app-store';
import { ConfigurationService } from '../../services/configuration.service';
import { Plant, Schedule, Shift } from 'src/app/app-store/models';
import { PlantActions, DepartmentActions, ShiftActions, ScheduleActions } from '@actions/*';
import { Select } from 'src/app/modules/dynamic-controls/components/select/select.model';
import { FormGroup } from '@angular/forms';
import { DynInput } from 'src/app/modules/dynamic-controls/components/input/input.model';
import { DynDatetime } from 'src/app/modules/dynamic-controls/components/dyn-datetime/dyn-datetime.model';
import { BaseControl } from 'src/app/modules/dynamic-controls/components/base/base.model';
import { DynNumber } from 'src/app/modules/dynamic-controls/components/dyn-number/dyn-number.model';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { filter } from 'rxjs/operators';
import { ListData } from '../list/list.component';

@Component({
  selector: 'app-config-schedule',
  templateUrl: './config-schedule.component.html',
  styleUrls: ['./config-schedule.component.scss']
})
export class ConfigScheduleComponent implements OnInit {
  isShowPanels: { [key: string]: boolean } = {};
  list: ListData;
  preConfigForm: FormGroup;
  shifts: Shift[];
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
    }
  ]
  editingObj: Schedule;
  configSchedule = [
    <BaseControl>{ key: 'startTime', type: 'time', label: 'Start Time', validators: { required: true } },
    <BaseControl>{ key: 'endTime', type: 'time', label: 'End Time', validators: { required: true } },
    <DynNumber>{ key: 'recurEveryWeeks', type: 'number', label: 'Recur Every Weeks', validators: { required: true } },
    <BaseControl>{ key: 'monday', type: 'checkbox', label: 'Monday' },
    <BaseControl>{ key: 'tuesday', type: 'checkbox', label: 'Tuesday' },
    <BaseControl>{ key: 'wednesday', type: 'checkbox', label: 'Wednesday' },
    <BaseControl>{ key: 'thursday', type: 'checkbox', label: 'Thursday' },
    <BaseControl>{ key: 'friday', type: 'checkbox', label: 'Friday' },
    <BaseControl>{ key: 'saturday', type: 'checkbox', label: 'Saturday' },
    <BaseControl>{ key: 'sunday', type: 'checkbox', label: 'Sunday' },
  ]

  editOptions = {
    properties: this.configSchedule,
    actType: 'edit',
    objectType: 'schedule'
  }
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
  ngOnDestroy() {
    this.store.dispatch(DepartmentActions.clearDepartments());
    this.store.dispatch(ShiftActions.clearShifts())
    this.store.dispatch(ScheduleActions.clearSchedules())
  }
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
    this.store.dispatch(ShiftActions.getShifts());
    this.store.pipe(
      select(allShifts)
    ).subscribe(shifts => {
      this.shifts = shifts;
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
    ).subscribe((schedules: Schedule[]) => this.list = this.confService.createList(schedules))
  }

  // getShifts() {
  //   this.store.pipe(
  //     select(allShifts),
  //   ).subscribe((shifts: Shift[]) => this.list = this.confService.createList(shifts))
  // }
  getPreConfigForm(e: FormGroup) {
    this.preConfigForm = e;
    e.get('departmentId').disable();
    e.get('plantId').valueChanges.subscribe(value => {
      if (value) {
        e.get('departmentId').enable();
        this.store.dispatch(DepartmentActions.loadDepartments({ plantId: +value }));
        e.get('departmentId').setValue(null)
      } else {
        e.get('departmentId').disable();
      }
    })
    e.get('departmentId').valueChanges.subscribe(value => {
      if (value) {
        this.store.dispatch(ScheduleActions.getSchedules({ departmentId: +value }));
      } else {
        this.store.dispatch(ScheduleActions.clearSchedules())
      }
    })
  }

  clickListsButton(e) {
    switch (e.action) {
      case 'edit':
        this.editingObj = e.item;
        this.isShowPanels.edit = true;
        break;
      case 'dlt':
        this.store.dispatch(ScheduleActions.deleteSchedule({ id: e.item.scheduleId }))
        break
    }
  }

  updateObj(e) {
    this.isShowPanels.edit = false;
    let schedule = <Schedule>{ ...this.editingObj };
    Object.assign(schedule, this.fixFormValue(this.configSchedule, e));
    this.store.dispatch(ScheduleActions.updateSchedule({ schedule }))
  }


  addObj(e) {
    this.isShowPanels.add = false;
    const shiftId = +this.preConfigForm.value.shiftId;
    const shift = this.shifts.find(i => i.shiftId === shiftId)
    let schedule = <Schedule>{};
    schedule.shiftDescription = shift.description;
    schedule.shiftName = shift.name;
    schedule.departmentId = +this.preConfigForm.value.departmentId;
    schedule.shiftId = shiftId;
    Object.assign(schedule, this.fixFormValue(this.configSchedule, e));
    this.store.dispatch(ScheduleActions.addSchedule({ schedule }))
  }

  fixFormValue(configArr: DynControl[], formValue: {}) {
    let value = {};
    configArr.map(i => {
      switch (i.type) {
        case 'checkbox':
          value[i.key] = !!formValue[i.key];
          break;
        case 'number':
          value[i.key] = +formValue[i.key];
          break;
        // case 'datetime':
        //   value[i.key] = new Date(formValue[i.key]).toJSON().slice(0, 19) + "Z";
        //   break;
        default:
          value[i.key] = formValue[i.key];
          break;
      }
    })
    return value;
  }
}
