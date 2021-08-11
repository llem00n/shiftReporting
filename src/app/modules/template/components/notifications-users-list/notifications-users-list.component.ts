import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-notifications-users-list',
  templateUrl: './notifications-users-list.component.html',
  styleUrls: ['./notifications-users-list.component.scss']
})
export class NotificationsUsersListComponent implements OnInit {
  weekDays = this.dateService.daysOfWeek;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit(): void {
  }

}
