import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Template } from '@models/*';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss']
})
export class TemplateCardComponent implements OnInit {
  @Input() template: Template;
  @Output() clickDelete = new EventEmitter<number>();
  @Output() clickEdit = new EventEmitter<number>();
  @Output() clickCopy = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  delete() {
    this.clickDelete.emit(this.template.templateId);
  }
  edit() {
    this.clickEdit.emit(this.template.templateId);
  }

  copy(){
    this.clickCopy.emit(this.template.templateId);
  }

}
