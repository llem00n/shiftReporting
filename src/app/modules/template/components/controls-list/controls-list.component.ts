import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { dynComponents } from '../../../dynamic-controls/';

@Component({
  selector: 'app-controls-list',
  templateUrl: './controls-list.component.html',
  styleUrls: ['./controls-list.component.scss']
})
export class ControlsListComponent implements OnInit {
  @Output() draggableControl: EventEmitter<string> = new EventEmitter<string>()
  show = false;
  list = [];
  
  ngOnInit(): void {
    this.list = dynComponents.getList();
  }

  dragStartHandler(e, key) {
    this.draggableControl.emit(key);
  }
}
