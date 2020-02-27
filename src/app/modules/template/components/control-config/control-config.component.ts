import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-config',
  templateUrl: './control-config.component.html',
  styleUrls: ['./control-config.component.scss']
})
export class ControlConfigComponent implements OnChanges {
  @Input() control: DynControl;


  show = false;
  constructor() { }

  ngOnChanges(): void {
    console.log(this.control);
    
  }
  getForm(form: FormGroup) {
    form.valueChanges.subscribe(console.log)
  }
    
}
