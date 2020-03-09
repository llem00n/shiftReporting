import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Type, ComponentRef } from '@angular/core';
import { Dialog } from './models/dialog.model';

@Component({
  templateUrl: './dialog.component.html'
})
export class DialogComponent {

  @ViewChild('dialog', { read: ViewContainerRef }) private dialog: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  createDialog<T extends Dialog>(component: Type<T>): ComponentRef<T> {
    this.dialog.clear();
    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(component);
    return this.dialog.createComponent(factory, 0);
  }
} 
