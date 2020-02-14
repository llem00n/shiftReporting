import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-dyn-time',
  templateUrl: './dyn-time.component.html',
  styleUrls: ['./dyn-time.component.scss']
})
export class DynTimeComponent implements OnInit {
  options: ControlOptions;
  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnInit() {
    this.clService.getData().subscribe(options => {
      this.options = options
    })
  }
}
