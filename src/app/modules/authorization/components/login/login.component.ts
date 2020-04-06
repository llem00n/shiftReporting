import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization.service';
import { State, User } from '@models/*';
import { Store, select } from '@ngrx/store';
import { UserActions } from '@actions/*';
import { allUsers } from 'src/app/app-store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  constructor(
    private authService: AuthorizationService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.store.dispatch(UserActions.getAllUsers())
    this.store.pipe(
      select(allUsers)
    ).subscribe(users => {
      this.users = users;
      if (!users[0]) return;
      this.login(users[0])
    })
  }

  login(user: User) {
    this.authService.isLoggedIn = true;
    this.authService.setCurrentUser(user.userId)
  }
}
