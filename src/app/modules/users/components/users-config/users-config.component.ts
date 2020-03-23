import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, User } from '@models/*';
import { allUsers } from 'src/app/app-store';
import { UserActions } from '@actions/*';
import { DialogService } from 'src/app/modules/dialog/dialog.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-users-config',
  templateUrl: './users-config.component.html',
  styleUrls: ['./users-config.component.scss']
})
export class UsersConfigComponent implements OnInit {
  users: User[];
  constructor(
    private store: Store<State>,
    private dialogService: DialogService,

  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    let respCount = 0;
    this.store.pipe(
      select(allUsers),
    ).subscribe((users: User[]) => {
      if (users.length === 0 && respCount === 0) {
        ++respCount;
        this.store.dispatch(UserActions.getAllUsers());
        return
      };
      this.users = users;
    })
  }

  addUser() {
    this.openDialog({})
  }
  edit(id) {
    const user = this.users.find(i => i.userId === id)
    this.openDialog(user)
  }
  openDialog(data) {
    const dialogRef = this.dialogService.open(UserFormComponent, data)
    dialogRef.afterClosed().subscribe(user => {
      if (!user) return;
      if (user.userId) {
        this.store.dispatch(UserActions.updateUser({ user }))
      } else {
        delete user.userId;
        // this.store.dispatch(PlantActions.addPlant({ plant }))
      }
    });
  }
}

