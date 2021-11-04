import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-dyn-url',
  templateUrl: './dyn-url.component.html',
  styleUrls: ['./dyn-url.component.scss']
})
export class DynUrlComponent implements OnInit {
  options: ControlOptions;
  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnInit(): void {
    this.clService.getData().subscribe(options => {
      this.options = options;
      console.log("dyn-url");
      console.log(this.options);
    })
  }

}
