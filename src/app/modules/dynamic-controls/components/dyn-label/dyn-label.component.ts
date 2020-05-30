import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-dyn-label',
  templateUrl: './dyn-label.component.html',
  styleUrls: ['./dyn-label.component.scss']
})
export class DynLabelComponent implements OnInit {
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
