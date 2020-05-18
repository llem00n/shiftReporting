import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-dyn-number',
  templateUrl: './dyn-number.component.html',
  styleUrls: ['./dyn-number.component.scss']
})
export class DynNumberComponent implements OnInit {

  min: number;
  max: number;

  options: ControlOptions;

  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnInit() {
    this.clService.getData().subscribe(options => {
      this.options = options
      this.getLimints(options.control.validators);
    })
  }
  getLimints(validators) {
    if(!validators) return;
    this.min = validators['min'] || null;
    this.max = validators['max'] || null;
  }
}
