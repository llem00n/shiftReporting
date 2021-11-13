import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../sevices/message.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  constructor(
    private messageService: MessageService
  ) { }
  close() {
    this.messageService.forceClose()
  }
}
