import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingComponent } from '../components/loading/loading.component'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private snackBar: MatSnackBar
  ) { }
  loadingMessage(msg: string) {
    this.snackBar.openFromComponent(LoadingComponent, { data: { msg } });
  }
  closeSnackBar() {
    this.snackBar.dismiss()
  }
  alertMessage(msg: string) {
    this.snackBar.open(msg, 'x', {
      duration: 5000,
      verticalPosition: 'top',
    })
  }
} 
