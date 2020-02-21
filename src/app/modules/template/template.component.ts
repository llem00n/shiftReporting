import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { DboardItem } from '../grid/grid.component';
import { DynText } from '../dynamic-controls/components/dyn-text/dyn-text.model';
import { Template } from 'src/app/app-store/template/template.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  _template = new Template();
  @Input()
  set template(template: Template) { if (template) this._template = new Template(JSON.parse(JSON.stringify(template))); };
  get template() { return this._template };

  appointment = 'build';
  dashboard: DboardItem[] = [1, 2, 3, 4, 5].map(num => {
    return {
      key: `item${num}`,
      gridsterItem: { x: 1, rows: 1, cols: 5, y: num },
      control: <DynText>{ type: 'text', key: `item${num}`, placeholder: `Item ${num}` }
    }
  });

  constructor(
    private location: Location,
  ) { }

  getFormGeneral(e: FormGroup) {
    e.valueChanges.subscribe(value =>
      Object.assign(this.template, value)
    )
  }

  ngOnInit(): void {
    console.log(this.template);
  }

  dragStartHandler(e, str) {
    console.log(str);
  }
  goBack() {
    this.location.back()
  }
  dropNewItem(event) {
    console.log(event);
  }
  clickItem(event) {
    console.log(event);
  }
  dashboardChange(event) {
    console.log(event);
  }
}
