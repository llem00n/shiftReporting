import { Component, OnInit, Inject } from '@angular/core';
import { Department, DynTextarea, DynText } from '@models/*';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  department: Department;
  form = new FormGroup({});
  config = [
    new DynText({ controlId: 'name', label: 'Name', validators: { required: true } }),
    new DynTextarea({ controlId: 'description', label: 'Description' }),
  ];



  constructor(
    public dialogRef: MatDialogRef<DepartmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { department: Department, },
  ) { }

  ngOnInit(): void {
    this.department = { ...this.data.department };
  }

  getForm(e: FormGroup) {
    this.form = e;
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.department, value)
      console.log(this.department);

    })
  }
}
