import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-dyn-color',
  templateUrl: './dyn-color.component.html',
  styleUrls: ['./dyn-color.component.scss']
})
export class DynColorComponent implements OnInit {
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
