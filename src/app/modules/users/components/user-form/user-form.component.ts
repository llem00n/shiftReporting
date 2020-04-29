import { Component, OnInit, Inject } from '@angular/core';
import { User, DynText, DynCheckbox, State, Role, DynSelect } from '@models/*';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { roles } from 'src/app/app-store';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  departments = new FormControl();
  departmentsList = [
    { departmentId: 0, name: 'Dep0' },
    { departmentId: 1, name: 'Dep1' },
    { departmentId: 2, name: 'Dep2' },
    { departmentId: 3, name: 'Dep3' },
    { departmentId: 4, name: 'Dep4' },
    { departmentId: 5, name: 'Dep5' },
    { departmentId: 6, name: 'Department 6' },
  ]


  user: User;
  form = new FormGroup({});
  forms: FormGroup[] = [];
  rolesView;
  name = [
    new DynText({ controlId: 'firstName', label: 'First name', validators: { required: true } }),
    new DynText({ controlId: 'secondName', label: 'Second name', validators: { required: true } }),
  ]
  login = [
    new DynText({ controlId: 'login', label: 'Login', validators: { required: true } }),
    new DynText({ controlId: 'email', label: 'Email', validators: { email: true } }),

  ]
  mail = [
    new DynText({ controlId: 'password', label: 'Password' }),
    new DynCheckbox({ controlId: 'isActive', label: 'Active user' }),
  ];

  role = [
    new DynSelect({ controlId: 'roleId', label: 'Role', options: this.rolesView, validators: { required: true }, }),
  ]

  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
  ) { }

  ngOnInit(): void {
    this.user = { ...this.data.user };
    this.getRoles();
  }

  getRoles() {
    this.store.pipe(
      select(roles),
    ).subscribe((roles: Role[]) => {
      if (!roles.length) return;
      this.rolesView = roles.map(i => {
        return {
          value: i.roleId,
          viewValue: i.roleName
        }
      })
      this.role.find(i => i.controlId = 'roleId').options = this.rolesView;
    })
  }

  getForm(e: FormGroup) {
    this.forms.push(e);
    if (this.forms.length !== 4) return;
    this.form = new FormGroup({
      f0: this.forms[0],
      f1: this.forms[1],
      f2: this.forms[2],
      f3: this.forms[3],
    })
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.user, value.f0, value.f1, value.f2, value.f3)
    })
  }


  // save(){
  //   this.dialogService.close(this.user)    
  // }

}


/*
departments: [{…}]
email: null
firstName: "Iegor I"
isActive: true
login: "bob1"
password: null
roles: [{…}]
secondName: "Shkurin"
userId: "0cbb9061-63ea-477b-8787-2a563b3dfc99"
__proto__: Object
__proto__: Object


options: { value: string | number, viewValue: string }
 */