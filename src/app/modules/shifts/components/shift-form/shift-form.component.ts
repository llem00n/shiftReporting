import { Component, OnInit, Inject } from '@angular/core';
import { Shift, DynText, DynTextarea, DynCheckbox } from '@models/*';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.scss']
})
export class ShiftFormComponent implements OnInit {
  shift: Shift;
  form = new FormGroup({});
  config = [
    new DynText({ controlId: 'name', label: 'Name', validators: { required: true } }),
    new DynTextarea({ controlId: 'description', label: 'Description' }),
    new DynCheckbox({ controlId: 'isActive', label: 'Active' }),
  ];



  constructor(
    public dialogRef: MatDialogRef<ShiftFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shift: Shift },
  ) { }

  ngOnInit(): void {
    console.log(this.data.shift.shiftId);
    
    if (this.data.shift.shiftId) this.shift = { ...this.data.shift }
    else this.shift = <Shift>{isActive: true}
    
  }

  getForm(e: FormGroup) {
    this.form = e;
    this.form.valueChanges.subscribe(value => {
      if (!value.isActive) value.isActive = false;
      Object.assign(this.shift, value)
    })
  }
}
