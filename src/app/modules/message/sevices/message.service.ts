import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { LoadingComponent } from '../components/loading/loading.component'
import { BehaviorSubject, Observable } from 'rxjs';


export interface AppMessage {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSourse = new BehaviorSubject<AppMessage>(null);
  private message = this.messageSourse.asObservable();

  private isShowMessageSourse = new BehaviorSubject<boolean>(null);
  private isShowMessage = this.isShowMessageSourse.asObservable();

  getMessage(): Observable<AppMessage> {
    return this.message;
  }
  setMessage(message: AppMessage): void {
    this.messageSourse.next(message);
    this.isShowMessageSourse.next(true)
  }


  getIsShowMessage(): Observable<boolean> {
    return this.isShowMessage;
  }

  private setIsShowMessage(isShow: boolean): void {
    this.isShowMessageSourse.next(isShow);
  }


  loadingMessage(message: string) {
    this.setMessage({
      message,
      type: 'loading'
    })
  }

  errorMessage(message: string) {
    this.setMessage({
      message,
      type: 'error'
    })
  }
  alertMessage(message: string) {
    this.close();
    if (!message) return;
    this.setMessage({
      message,
      type: 'alert'
    })
  }

  close() {
    this.setMessage(null);
    this.setIsShowMessage(false)
  }
} 
