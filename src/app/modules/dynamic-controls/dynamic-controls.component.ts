import { Component, OnInit, Input, OnChanges, Injectable } from '@angular/core';
import { InputComponent } from './components/input/input.component'
import { BehaviorSubject } from 'rxjs';
import { ControlsLocalService } from './services/controls-local.service';
import { ControlOptions } from './models/control-options.model';

@Component({
  selector: 'app-dynamic-controls',
  templateUrl: './dynamic-controls.component.html',
  styleUrls: ['./dynamic-controls.component.scss'],
  providers: [ControlsLocalService]
})
export class DynamicControlsComponent implements OnChanges {
  @Input() options: ControlOptions;
  component = InputComponent;

  private dataSourse = new BehaviorSubject<any>(null);
  data = this.dataSourse.asObservable();

  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnChanges() {
    this.clService.setData(this.options);
    // console.log(this.options);
  }

}
