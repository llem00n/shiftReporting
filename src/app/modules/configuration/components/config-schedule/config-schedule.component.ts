import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, allPlants, allDepartments, allShifts, allSchedules } from 'src/app/app-store';
import { ConfigurationService } from '../../services/configuration.service';
import { Plant, Schedule, Shift } from 'src/app/app-store/models';
import { PlantActions, DepartmentActions, ShiftActions, ScheduleActions } from '@actions/*';
import { FormGroup } from '@angular/forms';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { ListData } from '../list/list.component';
import { Router } from '@angular/router';
import { DynSelect } from '../../../dynamic-controls/models'
import { DialogService } from 'src/app/modules/dialog/dialog.service';
import { ScheduleComponent } from 'src/app/modules/schedule/schedule.component';

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
  schedules: Schedule[] = [];
  preConfig: DynControl[] = [
    new DynSelect({ controlId: 'plantId', type: 'select', label: 'Plant', validators: { required: true }, options: [], placeholder: 'Select plant' }),
    new DynSelect({ controlId: 'departmentId', type: 'select', label: 'Department', validators: { required: true }, options: [], placeholder: 'Select department' }),
    new DynSelect({ controlId: 'shiftId', type: 'select', label: 'Shift', validators: { required: true }, options: [] }),
  ]
  editingObj: Schedule;

  constructor(
    private store: Store<State>,
    private confService: ConfigurationService,
    private router: Router,
    private dialogService: DialogService,
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
        this.store.dispatch(PlantActions.getPlants());
        return;
      };
      this.preConfig
        .find(i => i.controlId === 'plantId')['options'] = plants.map(plant => {
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
      this.preConfig
        .find(i => i.controlId === 'departmentId')['options'] = departments.map(i => {
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
      const options = [{ value: null, viewValue: '--All shifts--' }]
      shifts.map(i => {
        options.push({
          value: '' + i.shiftId,
          viewValue: `${i.name}`
        })
      })
      this.preConfig
        .find(i => i.controlId === 'shiftId')['options'] = options;
    })
  }

  getSchedules() {
    this.store.pipe(
      select(allSchedules)
    ).subscribe(val => {
      this.schedules = val;
      const shiftId = this.preConfigForm ? +this.preConfigForm.value['shiftId'] : null;
      this.list = this.createScheduleList(val, shiftId)
    })
  }

  createScheduleList(schedules: Schedule[], shiftId?: number): ListData {
    if (!shiftId) return this.confService.createList(schedules);
    const list = schedules.filter(i => i.shiftId == shiftId)
    return this.confService.createList(list)
  }

  getPreConfigForm(e: FormGroup) {
    this.preConfigForm = e;
    e.get('departmentId').disable();
    e.get('shiftId').disable();
    e.get('plantId').valueChanges.subscribe(value => {
      if (!value) return e.get('departmentId').disable();
      e.get('departmentId').setValue(null)
      e.get('departmentId').enable();
      this.store.dispatch(DepartmentActions.getDepartments({ plantId: +value }));
    });
    e.get('departmentId').valueChanges.subscribe(value => {
      if (!value) return this.store.dispatch(ScheduleActions.clearSchedules())
      this.store.dispatch(ScheduleActions.getSchedules({ departmentId: +value }));
      e.get('shiftId').enable();
    })
    e.get('shiftId').valueChanges.subscribe(value => {
      this.list = this.createScheduleList(this.schedules, +value);
    })
  }

  clickListsButton(e) {
    switch (e.action) {
      case 'edit':
        this.openDialog(e.item)
        break;
      case 'dlt':
        this.store.dispatch(ScheduleActions.deleteSchedule({ id: e.item.scheduleId }))
        break
    }
  }
  addSchedule() {
    const shift = this.shifts.find(i => i.shiftId === +this.preConfigForm.value['shiftId'])
    const schedule = <Schedule>{
      departmentId: +this.preConfigForm.value['departmentId'],
      shiftId: shift.shiftId,
      shiftName: shift.name,
      shiftDescription: shift.description
    }
    this.openDialog(schedule)
  }

  openDialog(data) {
    const dialogRef = this.dialogService.open(ScheduleComponent, data)
    dialogRef.afterClosed().subscribe(schedule => {
      if (!schedule) return;
      if (schedule.scheduleId) {
        this.store.dispatch(ScheduleActions.updateSchedule({ schedule }))
      } else {
        delete schedule.scheduleId;
        this.store.dispatch(ScheduleActions.addSchedule({ schedule }))
      }
    });
  }
}
