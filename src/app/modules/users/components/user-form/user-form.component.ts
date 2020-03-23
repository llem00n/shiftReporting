import { Component, OnInit } from '@angular/core';
import { User, DynText, DynCheckbox } from '@models/*';
import { DialogService } from 'src/app/modules/dialog/dialog.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: User;
  title = 'Add user'
  saveButton = 'Add'
  config = [
    new DynText({ controlId: 'firstName', label: 'First name', validators: { required: true } }),
    new DynText({ controlId: 'secondName', label: 'Second name', validators: { required: true } }),
    new DynCheckbox({ controlId: 'isActive', label: 'Active user' }),
    new DynText({ controlId: 'login', label: 'Login', validators: { required: true } }),
    new DynText({ controlId: 'password', label: 'Password', validators: { required: true } }),
    new DynText({ controlId: 'email', label: 'Email' }),
  ];

  constructor(
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.user = new User(this.dialogService.getData())
    if (this.user.userId) {
      this.title = 'Edit plant';
      this.saveButton = 'Save'
    };
  }
  close() {
    this.dialogService.dismiss()
  }
  getForm(e){
    e.valueChanges.subscribe(value => {
      Object.assign(this.user, value)
    })
    
  }
  save(){
    this.dialogService.close(this.user)    
  }
}
