import { Component, OnInit } from '@angular/core';
import { User, State, Role } from '@models/*';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { allUsers, roles } from 'src/app/app-store';
import { UserActions } from '@actions/*';
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filterUsers: User[];
  search = new FormControl('')
  roles: Role[];
  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
  ) { }

  ngOnInit() {
    this.getUsers();
    this.store.dispatch(UserActions.getRoles());
    this.search.valueChanges.subscribe(str => this.setFilterUsers(str))
  }

  setFilterUsers(string?: string) {
    if (!string) {
      this.filterUsers = [...this.users];
      return;
    }
    const str = string.toLowerCase()
    this.filterUsers = this.users.filter(i => (
      i.firstName?.toLowerCase().includes(str)
      || i.secondName?.toLowerCase().includes(str)
      || i.email?.toLowerCase().includes(str)
      || i.login?.toLowerCase().includes(str)
    ))
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
      this.filterUsers = users;
      this.search.setValue('')
    })
  }
  addItem() {
    const user = <User>{
      roleId: 5
    }
    this.openDialog(user)
  }
  edit(id) {
    const user = this.users.find(i => i.userId === id)
    this.openDialog(user)
  }
  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, { data: { user } })
    dialogRef.afterClosed().subscribe(user => {
      if (!user) return;
      if (user.userId) {
        this.store.dispatch(UserActions.updateUser({ user }));
        return;
      }
      this.store.dispatch(UserActions.addUser({ user }));
    });
  }
}
