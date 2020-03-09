import { ComponentRef } from  '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Dialog } from './dialog.model';
import { DialogComponent } from '../dialog.component';

export class DialogRef {

  private result$ = new Subject<any>();

  constructor(
    private modalContainer: ComponentRef<DialogComponent>,
    private modal: ComponentRef<Dialog>,
  ) {
    this.modal.instance.modalInstance = this;
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
    this.modal.destroy();
    this.modalContainer.destroy();
    this.result$.complete();
  }

}