import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../components/loading/loading.component'
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

  getMessage(): Observable<AppMessage> {
    return this.message;
  }
  showMessage(message: AppMessage): void {
    this.messageSourse.next(message);
  }
  loadingMessage(message: string) {
    this.showMessage({
      message,
      type: 'loading'
    })
  }

  errorMessage(message: string) {
    this.showMessage({
      message,
      type: 'error'
    })
  }


  closeSnackBar() {
    console.log('closeSnackBar');

    // this.snackBar.dismiss()
  }
  alertMessage(msg: string) {
    // this.snackBar.open(msg, 'x', {
    //   duration: 5000,
    //   verticalPosition: 'top',
    // })
  }
} 
