import { Component, OnInit } from '@angular/core';
import { dynComponents } from '../../../dynamic-controls/';
import { from } from 'rxjs';

@Component({
  selector: 'app-controls-list',
  templateUrl: './controls-list.component.html',
  styleUrls: ['./controls-list.component.scss']
})
export class ControlsListComponent implements OnInit {
  show = false;
  list: Array<string> = [];
  constructor() { }

  ngOnInit(): void {
    this.list = dynComponents.getList();
  }

  dragStartHandler(e, r) {
    console.log(e, r);

  }
}
