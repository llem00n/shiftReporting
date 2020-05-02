import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorizationService } from 'src/app/modules/authorization/authorization.service';
import { User, State, Department } from '@models/*';
import { tap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DepartmentActions } from '@actions/*';
import { userDepartments } from 'src/app/app-store';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-user-department',
  templateUrl: './select-user-department.component.html',
  styleUrls: ['./select-user-department.component.scss']
})
export class SelectUserDepartmentComponent implements OnInit {
  @Output() changeDepartment = new EventEmitter<Department>()
  department = new FormControl(null);
  departments: Department[]
  constructor(
    private authService: AuthorizationService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.select(userDepartments).subscribe(dep => {
      this.departments = dep;
      dep.length == 1 && this.department.setValue(dep[0].departmentId);
    });

    this.authService.getCurrentUser()
      .pipe(
        filter(data => !!data),
        tap(({ userId }) => this.store.dispatch(DepartmentActions.getUserDepartments({ userId })))
      ).subscribe()
    this.department.valueChanges.subscribe(val => {
      const dep = this.departments.find(d => d.departmentId == val);
      this.changeDepartment.emit(dep);
    })
  }
}
