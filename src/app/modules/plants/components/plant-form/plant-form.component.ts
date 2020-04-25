import { Component, OnInit, Inject } from '@angular/core';
import { DynText, Plant } from '@models/*';
import { DialogService } from 'src/app/modules/dialog/dialog.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent implements OnInit {
  plant: Plant;
  form: FormGroup;
  forms: FormGroup[] = [];
  nameCode = [
    new DynText({ controlId: 'name', type: 'text', label: 'Name', validators: { required: true } }),
    new DynText({ controlId: 'code', type: 'text', label: 'Code', validators: { required: true } }),
  ];
  address = [
    new DynText({ controlId: 'address', type: 'text', label: 'Address', validators: { required: true } }),
  ]



  constructor(
    public dialogRef: MatDialogRef<PlantFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { plant: Plant, },
  ) { }

  ngOnInit(): void {
    this.plant = { ...this.data.plant };
  }

  getForm(e: FormGroup) {
    this.forms.push(e);
    if (this.forms.length !== 2) return;
    this.form = new FormGroup({
      form1: this.forms[0],
      form2: this.forms[1],
    })
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.plant, value.form1, value.form2)
    })
  }
}
