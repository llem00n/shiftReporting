import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { LoadingComponent } from '../components/loading/loading.component'
import { BehaviorSubject, Observable, ObservableLike } from 'rxjs';


export interface AppMessage {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message = new BehaviorSubject<AppMessage>(null);
  private isShowMessage = new BehaviorSubject<boolean>(false);
  private queue: AppMessage[] = [];

  getMessage(): Observable<AppMessage> {
    return this.message.asObservable();
  }

  getIsShowMessage(): Observable<boolean> {
    return this.isShowMessage.asObservable();
  }

  loadingMessage(message: string): void {
    this.queue.push({
      message,
      type: 'loading'
    })

    this.update();
  }

  alertMessage(message: string): void {
    this.queue.push({
      message,
      type: 'alert'
    })

    this.update();
  }

  errorMessage(message: string): void {
    this.queue.push({
      message,
      type: 'error'
    })

    this.update();
  }

  close(): void {
    if (this.message.value?.type != 'error')
      this.message.next(null);

    this.update();
  }

  forceClose(): void {
    this.message.next(null);

    this.update();
  }

  private update() {
    if (this.message.value?.type === 'error')
      return;

    while (this.queue.length) {
      this.message.next(this.queue[0]);
      this.queue.shift();
      if (this.queue[0]?.type === 'error') break;
    }

    this.isShowMessage.next(!!this.message.value);
  }
} 
