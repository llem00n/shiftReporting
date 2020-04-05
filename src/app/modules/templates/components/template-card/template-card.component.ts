import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Template } from '@models/*';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss']
})
export class TemplateCardComponent implements OnInit {
  @Input() template: Template;
  @Output() clickEdit = new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }

}
