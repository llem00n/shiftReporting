import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  private dialogs = new BehaviorSubject<Array<any>>([]);
  private afterClosed;
  getDialogs() {
    return this.dialogs.asObservable()
  }
  getData() {
    const dialogs = this.dialogs.getValue();
    return dialogs[dialogs.length - 1].data;
  }
  open<T>(component: Type<T>, data?: any) {
    const dialogs = this.dialogs.getValue()
    dialogs.push({ component, data })
    this.afterClosed = new Subject()
    return {
      afterClosed: () => {
        return this.afterClosed.asObservable();
      }
    }
  }
  close(output?: any) {
    this.afterClosed.next(output || null);
    const dialogs = this.dialogs.getValue()
    dialogs.pop()
  }
  dismiss(output?: any) {
    this.afterClosed.next(output || null);
    const dialogs = this.dialogs.getValue()
    dialogs.pop()
  }
}
