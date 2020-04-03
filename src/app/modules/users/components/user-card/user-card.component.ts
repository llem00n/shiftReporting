import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@models/*';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() clickEdit = new EventEmitter<string>()
  @Output() clickRoles = new EventEmitter<string>()
  @Output() clickDepartments = new EventEmitter<string>()
  // @Output() clickDelete = new EventEmitter<number>()
  constructor(  ) { }

  ngOnInit(): void {

  }

  get firstName() {
    return this.user.firstName;
  }

  get secondName() {
    return this.user.secondName;
  }

  get login() {
    return this.user.login;
  }

  get email() {
    return this.user.email;
  }
  get isActive() {
    return this.user.isActive;
  }

  edit() {
    this.clickEdit.emit(this.user.userId)
  }
}
