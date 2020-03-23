import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthorizationService
  ) { }

  ngOnInit(): void {
  }
  login(role, name) {
    console.log(role);
    // this.authService.isLoggedIn = true;
    // this.authService.setCurrentUser({
    // name,
    // role
    // })
  }
}
