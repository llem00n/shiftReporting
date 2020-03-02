import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-config',
  templateUrl: './control-config.component.html',
  styleUrls: ['./control-config.component.scss']
})
export class ControlConfigComponent implements OnChanges {
  @Input() control: DynControl;
  // @Output() form = new EventEmitter<FormGroup>()
  @Output() deleteControl = new EventEmitter<string>()


  show = false;
  constructor() { }

  ngOnChanges(): void {    
  }
  getForm(form: FormGroup) {
    form.valueChanges.subscribe(value => {
      Object.assign(this.control, value)
    })
  }
    
}
