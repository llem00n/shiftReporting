import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface ListData {
  actionButtons?: { key: string, title: string }[];
  head: { key: string, title: string }[];
  tableData: Object[]
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() data: ListData;
  @Output() clickActionButton: EventEmitter<{ action: string, item: {} }> = new EventEmitter();

  clickActButton(action, item) {
    this.clickActionButton.emit({
      action, item
    })
  }
}
