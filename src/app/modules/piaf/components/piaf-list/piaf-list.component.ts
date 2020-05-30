import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-piaf-list',
  templateUrl: './piaf-list.component.html',
  styleUrls: ['./piaf-list.component.scss']
})
export class PiafListComponent {

  @Input() list: Array<string>;
  @Input() active: string;
  @Input() icon: string;
  @Output() select: EventEmitter<string> = new EventEmitter<string>();
}
