import { Component, OnInit } from '@angular/core';
import { DynText, Plant } from '@models/*';
import { DialogService } from 'src/app/modules/dialog/dialog.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent implements OnInit {
  plant: Plant;
  title = 'Add plant'
  saveButton = 'Add'
  configPlant = [
    new DynText({ controlId: 'name', type: 'text', label: 'Name', validators: { required: true } }),
    new DynText({ controlId: 'code', type: 'text', label: 'Code', validators: { required: true } }),
    new DynText({ controlId: 'address', type: 'text', label: 'Address', validators: { required: true } }),
  ];

  constructor(
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getForm(e: FormGroup) {
    e.valueChanges.subscribe(value => {
      Object.assign(this.plant, value)
    })
  }

  getData() {
    this.plant = new Plant(this.dialogService.getData())
    if (this.plant.plantId) {
      this.title = 'Edit plant';
      this.saveButton = 'Save'
    };
  }

  save() {
    this.dialogService.close(this.plant)
  }
  close() {
    this.dialogService.dismiss()
  }

}
