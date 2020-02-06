import { Component, OnInit } from '@angular/core';
import { ListData } from '../list/list.component';
import { FormGroup } from '@angular/forms';
import { Select } from 'src/app/modules/dynamic-controls/components/select/select.model';
import { Shift } from 'src/app/app-store/shift/shift.model';
import { select, Store } from '@ngrx/store';
import { State, allPlants, allDepartments, allShifts } from 'src/app/app-store';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { PlantActions, DepartmentActions, ShiftActions } from '@actions/*';
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
  preConfigForm: FormGroup;
  preConfig = [
    // <Select>{
    //   key: 'plantId',
    //   type: 'select',
    //   label: 'Plant',
    //   validators: { required: true },
    //   options: [],
    //   placeholder: 'Select plant'
    // },
    // <Select>{
    //   key: 'departmentId',
    //   type: 'select',
    //   label: 'Department',
    //   validators: { required: true },
    //   options: [],
    //   placeholder: 'Select department'
    // },
  ]
  editingObj: Shift;

  configShift = [
    <DynInput>{ key: 'name', type: 'input', label: 'Name', validators: { required: true } },
    <DynInput>{ key: 'description', type: 'input', label: 'Description' },
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
    // this.getPlants();
    // this.getDepartments()

    this.getShifts()
  }
  ngOnDestroy() {
    // this.store.dispatch(DepartmentActions.clearDepartments());
    this.store.dispatch(ShiftActions.clearShifts())
  }
  // getPlants() {
  //   let respCount = 0;
  //   this.store.pipe(
  //     select(allPlants),
  //   ).subscribe((plants: Plant[]) => {
  //     if (plants.length === 0 && respCount === 0) {
  //       ++respCount;
  //       this.store.dispatch(PlantActions.loadPlants());
  //       return;
  //     };
  //     this.preConfig[0].options = plants.map(plant => {
  //       return {
  //         value: plant.plantId,
  //         viewValue: `${plant.name} (${plant.code}, ${plant.address})`
  //       }
  //     })
  //   })
  // }
  // getDepartments() {
  //   this.store.pipe(
  //     select(allDepartments)
  //   ).subscribe(departments => {
  //     // console.log(departments);
  //     this.preConfig[1].options = departments.map(i => {
  //       return {
  //         value: '' + i.departmentId,
  //         viewValue: `${i.name}`
  //       }
  //     })
  //   })
  // }
  getShifts() {
    this.store.dispatch(ShiftActions.getShifts())
    this.store.pipe(
      select(allShifts),
    ).subscribe((shifts: Shift[]) => this.list = this.confService.createList(shifts))
  }
  // getPreConfigForm(e: FormGroup) {
  //   this.preConfigForm = e;
  //   e.get('plantId').valueChanges.subscribe(value => {
  //     const plantId = +value;
  //     e.get('departmentId').setValue(null)
  //     this.store.dispatch(DepartmentActions.loadDepartments({ plantId }));
  //   })
  //   e.get('departmentId').valueChanges.subscribe(value => {
  //     if (value) {
  //       const departmentId = +value;
  //       this.store.dispatch(ShiftActions.getShifts({ departmentId }))
  //     } else {
  //       this.store.dispatch(ShiftActions.clearShifts())
  //     }
  //   })
  // }

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
    Object.assign(shift, this.preConfigForm.value, e);
    this.store.dispatch(ShiftActions.addShift({ shift }))
  }
}
