import { Component,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { Department } from '@models/*';

export interface Data{
  templateName:string,
  departmentsAvailable:Department[],
  currentDepartmentId:number
}

@Component({
  selector: 'app-template-copy',
  templateUrl: './template-copy.component.html',
  styleUrls: ['./template-copy.component.scss']
})
export class TemplateCopyComponent{

  departmentId!:number;
  name!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:Data) {}

 ngOnInit(){
   this.name = this.data.templateName;
 }

 newName = new FormControl('',[this.nameValidator(this.data.templateName)]);

 getErrorMessage() {
  if (this.newName.hasError('required')) {
    return 'You must enter a value';
  }

  return this.newName.hasError('name') ? 'Please change the name' : '';
}

nameValidator(templateName:string):ValidatorFn{
  return (control: AbstractControl):ValidationErrors|null=>{
  let res=null;
  if(control.value === templateName){
      res = {'name':true};
  }
  return res;
}
}
}
