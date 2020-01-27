import { Component, OnInit } from '@angular/core';
import { MessageService, AppMessage } from './sevices/message.service';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { filter } from 'rxjs/operators';
import { AlertComponent } from './components/alert/alert.component';

const messageComponent = {
  loading: LoadingComponent,
  error: ErrorComponent,
  alert: AlertComponent
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
  isShow = false;
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.getMessage()
      .pipe(
        filter(v => !!v)
      )
      .subscribe(message => {
        this.content = [[document.createTextNode(message.message)]]
        this.component = messageComponent[message.type];
      });

    this.messageService.getIsShowMessage().subscribe(isShow => this.isShow = isShow)
  }

}
