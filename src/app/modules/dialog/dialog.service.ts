import { Injectable, ComponentFactory, ComponentFactoryResolver, ApplicationRef, Type } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { Dialog } from './models/dialog.model';
import { DialogRef } from './models/dialog-ref.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogContainer: HTMLElement;
  private dialogContainerFactory: ComponentFactory<DialogComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {
    this.setupDialogContainerFactory();
  }

  open<T extends Dialog>(component: Type<T>, inputs?: any): DialogRef {
    
    this.setupDialogDiv();
    const dialogContainerRef = this.appRef.bootstrap(this.dialogContainerFactory, this.dialogContainer);
    const modalComponentRef = dialogContainerRef.instance.createDialog(component);

    if (inputs) {
      modalComponentRef.instance.onInjectInputs(inputs);
    }

    const dialogRef = new DialogRef(dialogContainerRef, modalComponentRef);

    return dialogRef;
  }

  private setupDialogDiv(): void {
    this.dialogContainer = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(this.dialogContainer);
  }

  private setupDialogContainerFactory(): void {
    this.dialogContainerFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
  }
}