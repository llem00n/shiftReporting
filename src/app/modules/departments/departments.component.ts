import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, Department } from '@models/*';
import { allDepartments } from 'src/app/app-store';
import { FormControl } from '@angular/forms';
import { DepartmentActions } from '@actions/*';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  search = new FormControl('');
  filterDepartments: Department[];
  departments: Department[];
  plantId: number;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDepartments();
    this.search.valueChanges.subscribe(str => this.setFilterDep(str))

  }
  setFilterDep(string?: string) {
    if (!string) {
      this.filterDepartments = [...this.departments];
      return;
    }
    const str = string.toLowerCase()
    this.filterDepartments = this.departments.filter(i => (
      true
      || i.name.toLowerCase().includes(str)
      || i.description.toLowerCase().includes(str)
    ))
  }

  getDepartments() {
    this.store.pipe(
      select(allDepartments),
    ).subscribe((departments: Department[]) => {  
      this.departments = departments;
      this.filterDepartments = departments;
      this.search.setValue('')
    })
  }
  changePlant(e) {
    const plantId = this.plantId = e.plantId
    this.store.dispatch(DepartmentActions.getDepartments({ plantId }));
  }
  addItem() {
    this.openDialog(<Department>{})
  }
  edit(id) {
    const department = this.departments.find(i => i.departmentId === id)
    this.openDialog(department)
  }
  openDialog(department: Department) {
    console.log(department);
    
    const dialogRef = this.dialog.open(DepartmentFormComponent, { data: { department } });
    dialogRef.afterClosed().subscribe(department => {
      if (!department) return;
      if (department.departmentId) {
        this.store.dispatch(DepartmentActions.updateDepartment({ department }));
        return;
      }
      department.plantId = this.plantId;
      this.store.dispatch(DepartmentActions.addDepartment({ department }));
    });
  }
  delete(id) {    
    this.store.dispatch(DepartmentActions.deleteDepartment({ id }))
  }

}

// Description for department "dep 2
