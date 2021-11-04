import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-input-url',
  templateUrl: './input-url.component.html',
  styleUrls: ['./input-url.component.scss']
})
export class InputUrlComponent implements OnInit {
  
  options: ControlOptions;
  constructor(
    private clService: ControlsLocalService
  ) { }

  ngOnInit() {
    this.clService.getData().subscribe(options => {
      this.options = options;
      console.log(this.options);
    }
    )
  }




}
