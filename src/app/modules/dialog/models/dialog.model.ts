import { DialogRef } from './dialog-ref.model';

export abstract class Dialog {

  modalInstance: DialogRef;

  abstract onInjectInputs(inputs: any): void;

  close(output?: any): void {
    this.modalInstance.close(output);
  }

  dismiss(output?: any): void {
    this.modalInstance.dismiss(output);
  }

}