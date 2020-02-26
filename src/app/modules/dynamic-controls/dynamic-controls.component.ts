import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ControlsLocalService } from './services/controls-local.service';
import { FormGroup } from '@angular/forms';
import { DynControl } from './models/';
import { DynInput } from './components/input/input.model';
import { dynComponents } from './components/dyn-components';


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
    this.clService.setData({ control: this.control, form: this.form });
    this.component = dynComponents.get(this.control.type);    
  }
}
