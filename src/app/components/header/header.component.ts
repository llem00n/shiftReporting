import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/modules/authorization/authorization.service';
import { User } from 'src/app/modules/authorization/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthorizationService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {      
      this.user = user
    })
  }

}
