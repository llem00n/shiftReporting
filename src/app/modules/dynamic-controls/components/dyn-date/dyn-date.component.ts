import { Component, OnInit } from '@angular/core';
import { ControlOptions } from '../../models/control-options.model';
import { ControlsLocalService } from '../../services/controls-local.service';

@Component({
  selector: 'app-dyn-date',
  templateUrl: './dyn-date.component.html',
  styleUrls: ['./dyn-date.component.scss']
})
export class DynDateComponent implements OnInit {
  options: ControlOptions;
  constructor(
    private clService: ControlsLocalService,
  ) { }

  ngOnInit() {
    this.clService.getData().subscribe(options => {
      this.options = options;
      if (!options.form.value[options.control.controlId]) return
      //set date to input format
      const formValue = options.form.value[options.control.controlId].slice(0, 10);
      const value = new Date(formValue).toJSON().slice(0, 10);
      options.form.get(options.control.controlId).setValue(value);

    })
  }
}
