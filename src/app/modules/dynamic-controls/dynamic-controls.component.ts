import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { BehaviorSubject } from 'rxjs';
import { ControlsLocalService } from './services/controls-local.service';
import { ControlOptions } from './models/control-options.model';
import { FormGroup } from '@angular/forms';
import { DynControl } from './models/';
import { DynInput } from './components/input/input.model';

// enum Controls {
//   InputComponent = 'input',
//   SelectComponent = 'select'
// }

const controls = {
  input: InputComponent,
  select: SelectComponent
}

@Component({
  selector: 'app-dynamic-controls',
  templateUrl: './dynamic-controls.component.html',
  styleUrls: ['./dynamic-controls.component.scss'],
  providers: [ControlsLocalService]
})
export class DynamicControlsComponent implements OnChanges {
  @Input() control: DynControl;
  @Input() form: FormGroup;

  component;
  private dataSourse = new BehaviorSubject<any>(null);
  private data = this.dataSourse.asObservable();

  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnChanges() {
    this.clService.setData({ control: <DynInput>this.control, form: this.form });
    this.component = controls[this.control.type];
  }
}
