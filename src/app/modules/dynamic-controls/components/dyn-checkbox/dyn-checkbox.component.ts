import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-dyn-checkbox',
  templateUrl: './dyn-checkbox.component.html',
  styleUrls: ['./dyn-checkbox.component.scss']
})
export class DynCheckboxComponent implements OnInit {
  options: ControlOptions;
  isChecked: boolean;
  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnInit() {
    this.clService.getData().subscribe(options => {
      this.options = options;
      this.isChecked = options.form.value[options.control.controlId]
    })
  }
  toggleCheck() {
    this.isChecked = !this.isChecked
    this.options.form
      .get(this.options.control.controlId)
      .setValue(this.isChecked);
  }
}
