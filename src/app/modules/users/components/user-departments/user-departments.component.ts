import { Component, OnInit } from '@angular/core';
import { State, Department, DynSelect, Plant } from '@models/*';
import { Store, select } from '@ngrx/store';
import { userDepartments, allPlants, allDepartments } from 'src/app/app-store';
import { UserActions, DepartmentActions, PlantActions } from '@actions/*';
import { DialogService } from 'src/app/modules/dialog/dialog.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-departments',
  templateUrl: './user-departments.component.html',
  styleUrls: ['./user-departments.component.scss']
})
export class UserDepartmentsComponent implements OnInit {
  plantId: number;
  departments: Department[];
  userDepartments: Department[];
  userId: string;
  title = "Set user's departments";
  preConfigForm: FormGroup;
  preConfig = [
    new DynSelect({
      controlId: 'plantId',
      label: 'Plant',
      validators: { required: true },
      options: [],
      placeholder: 'Select plant'
    })
  ]

  constructor(
    private store: Store<State>,
    private dialogService: DialogService,

  ) { }

  ngOnInit(): void {
    this.getData()
  }
  ngOnDestroy(): void {
    this.store.dispatch(DepartmentActions.getUserDepartmentsSucces({ departments: [] }))
  }
  getData() {
    const userId = this.dialogService.getData();
    this.userId = userId;
    this.getPlants();
    this.getDepartments();
    this.store.dispatch(DepartmentActions.getUserDepartments({ userId }))
    this.getUserDepartments();
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
        .find(i => i.controlId === 'plantId')
        .options = plants.map(plant => {
          return {
            value: plant.plantId,
            viewValue: `${plant.name} (${plant.code}, ${plant.address})`
          }
        })
    })
  }
  getPreConfigForm(e: FormGroup) {
    this.preConfigForm = e;
    e.valueChanges.subscribe(
      value => {
        const plantId = +value.plantId;
        this.store.dispatch(DepartmentActions.getDepartments({ plantId }))
      }
    )
  }
  getDepartments() {
    this.store.pipe(
      select(allDepartments),
    ).subscribe((departments: Department[]) => {
      this.departments = departments;
      this.plantId = this.preConfigForm?.value.plantId;
    })
  }

  getUserDepartments() {
    this.store.pipe(
      select(userDepartments)
    ).subscribe(userDepartments => {
      this.userDepartments = userDepartments;
    })
  }

  close() {
    this.dialogService.dismiss()
  }
  getChecked(dep: Department): boolean {
    return this.userDepartments?.map(i => i.departmentId).includes(dep.departmentId)
  }
  toggleRole(dep: Department) {
    const payload = {
      userId: this.userId,
      departmentId: dep.departmentId
    }
    if (this.userDepartments?.map(i => i.departmentId).includes(dep.departmentId)) {
      this.store.dispatch(UserActions.deleteUserDepartment(payload))
    } else {
      this.store.dispatch(UserActions.addUserDepartment(payload))
    }
  }
}

