import { ComponentRef } from  '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Dialog } from './dialog.model';
import { DialogComponent } from '../dialog.component';

export class DialogRef {

  private result$ = new Subject<any>();

  constructor(
    private dialogContainer: ComponentRef<DialogComponent>,
    private dialog: ComponentRef<Dialog>,
  ) {
    this.dialog.instance.modalInstance = this;
  }

  close(output: any): void {
    this.result$.next(output);
    this.destroy$();
  }

  dismiss(output: any): void {
    this.result$.error(output);
    this.destroy$();
  }

  onResult(): Observable<any> {
    return this.result$.asObservable();
  }

  private destroy$(): void {
    this.dialog.destroy();
    this.dialogContainer.destroy();
    this.result$.complete();
  }

}