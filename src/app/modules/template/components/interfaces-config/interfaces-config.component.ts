import { Component, OnInit } from '@angular/core';
import { DynControl } from 'src/app/modules/dynamic-controls/models';
import { DynCheckbox } from 'src/app/modules/dynamic-controls/components/dyn-checkbox/dyn-checkbox.model';

@Component({
  selector: 'app-interfaces-config',
  templateUrl: './interfaces-config.component.html',
  styleUrls: ['./interfaces-config.component.scss']
})
export class InterfacesConfigComponent implements OnInit {
  show = false;
  interfacesConfig = [
    new DynCheckbox({ controlId: 'PIAFTemplate', type: 'checkbox', label: 'PIAF Template' }),
    new DynCheckbox({ controlId: 'PIAFAttributes', type: 'checkbox', label: 'PIAF Attributes' }),
    new DynCheckbox({ controlId: 'XML', type: 'checkbox', label: "XML" }),
    new DynCheckbox({ controlId: 'Excel', type: 'checkbox', label: "Excel" }),
    new DynCheckbox({ controlId: 'DatabaseTable', type: 'checkbox', label: "Database Table" }),
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
