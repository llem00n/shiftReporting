import { Component, OnInit } from '@angular/core';
import { ControlsLocalService } from '../../services/controls-local.service';
import { ControlOptions } from '../../models/control-options.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  options: ControlOptions; 
  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnInit() {   
    this.clService.getData().subscribe(options => this.options = options)
  }
}
