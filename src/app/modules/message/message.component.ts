import { Component, OnInit } from '@angular/core';
import { MessageService, AppMessage } from './sevices/message.service';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';

const messageComponent = {
  loading: LoadingComponent,
  error: ErrorComponent
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  message: string;
  component;
  content = null;
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.getMessage().subscribe(message => {
      this.content = [[document.createTextNode(message.message)]]
      this.message = message.message;
      this.component = messageComponent[message.type];
    });
  }

}
