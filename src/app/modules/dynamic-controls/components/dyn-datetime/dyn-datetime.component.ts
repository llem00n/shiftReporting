import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-dyn-datetime',
  templateUrl: './dyn-datetime.component.html',
  styleUrls: ['./dyn-datetime.component.scss']
})
export class DynDatetimeComponent implements OnInit {
  options: ControlOptions;
  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnInit() {
    this.clService.getData().subscribe(options => {
      console.log(options);
      
      this.options = options
    })
  }
  get min (){return this.options.control.min}
  get max (){return this.options.control.max}
}
