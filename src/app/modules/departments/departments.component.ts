import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, Department } from '@models/*';
import { allDepartments } from 'src/app/app-store';
import { FormControl } from '@angular/forms';
import { DepartmentActions } from '@actions/*';

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
      // || i.name.toLowerCase().includes(str)
      // || i.code.toLowerCase().includes(str)
      // || i.address.toLowerCase().includes(str)
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
    // this.openDialog(<Plant>{})
  }
  edit(id) {
    // const plant = this.plants.find(i => i.plantId === id)
    // this.openDialog(plant)
  }
  openDialog(department: Department) {
    // const dialogRef = this.dialog.open(PlantFormComponent, { data: { plant } })
    // dialogRef.afterClosed().subscribe(plant => {
    //   if (!plant) return;
    //   if (plant.plantId) {
    //     this.store.dispatch(PlantActions.updatePlant({ plant }));
    //     return;
    //   }
    //   this.store.dispatch(PlantActions.addPlant({ plant }));
    // });
  }
  delete(id) {
    // this.store.dispatch(PlantActions.deletePlant({ id }))
  }

}
