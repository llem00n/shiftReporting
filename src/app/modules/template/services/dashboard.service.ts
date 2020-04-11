import { Injectable } from '@angular/core';
import { dynComponents } from '../../dynamic-controls';
import { DynControl } from '../../dynamic-controls/models';
import { GridsterItem } from 'angular-gridster2';
import { Interface } from '@models/*';
import { PiafHttpService } from '../../piaf/piaf-http.service';
import { DynLabel } from '../../dynamic-controls/components/dyn-label/dyn-label.model';

interface Atribute {
  name: string;
  type: string;
  label?: string;
  readonly?: boolean;
  valueKey?: string;
  preKey?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  preKey: string = 'attr';

  baseAttributes: {
    [key: string]: Array<Atribute>
  } = {
      PIAFEventFrames: [
        { name: 'TemplateName', label: 'Template name', type: 'System.String', readonly: true, },
        { name: 'StartTime', label: 'Start time', type: 'System.DateTime' },
        { name: 'EndTime', label: 'End time', type: 'System.DateTime' },
        { name: 'EventName', label: 'Event name', type: 'System.String' },
      ],
      PIAFAttributes: [
        { name: 'Timestamp', label: 'Template stamp', type: 'System.DateTime', }
      ]
    }

  constructor(
    private piafHttpService: PiafHttpService
  ) { }

  createDashboard(dashboard: DynControl[]): DynControl[] {
    const result: DynControl[] = [];
    dashboard.map(i => {
      const model = dynComponents.getModel(i.type);
      result.push(new model(i));
    });
    return result;
  }

  createNewControl(dashboard, gridItem, controlTypeKey): DynControl {
    const controlType = dynComponents.getModel(controlTypeKey)
    gridItem.cols = this.getMaxColsS(gridItem, dashboard);
    const newControl = new controlType({ gridItem });
    dashboard.push(newControl)
    return newControl;
  }
  getMaxColsS(newItem: GridsterItem, dboard: DynControl[]): number {
    console.log(dboard);
    console.log(newItem);

    const dboardGridster = dboard.map(i => i.gridItem);
    let maxLength = 5; /* maxLength - length of new element */
    for (let i = 1; i <= maxLength; i++) {
      dboardGridster.map(item => {
        if (item.x === newItem.x + i
          && item.y <= newItem.y
          && item.y + item.rows - 1 >= newItem.y) {
          maxLength = i;
        }
      });
    }
    return maxLength;
  }

  createControls(dashboard: DynControl[], iface: Interface) {
    let attributes: Atribute[] = []
    switch (iface.name) {
      case 'PIAFAttributes':
        attributes = attributes.concat(this.baseAttributes[iface.name]);
        this.createAttributeControls(dashboard, attributes);
        break;
      case 'PIAFEventFrames':
        attributes = attributes.concat(this.baseAttributes[iface.name]);
        this.piafHttpService.getEventFrameTemplate({
          serverName: iface.setting1,
          databaseName: iface.setting2,
          eventFrameTemplateName: iface.setting3,
        }).subscribe(efTemplate => {
          if (efTemplate) efTemplate.attributes.map(attr => attributes.push({ ...attr, preKey: this.preKey }));
          this.createAttributeControls(dashboard, attributes);
        });
        break;
      default:
        break
    }
  }

  createAttributeControls(dashboard: DynControl[], attributes: Atribute[]) {
    attributes.map(attr => {
      const indexY = this.lastRow(dashboard) + 1;
      dashboard.push(this.createLabel(attr, indexY));
      // this.createControl(attr, indexY)
    });
    console.log(this.lastRow(dashboard));
  }
  lastRow(dashboard: DynControl[]) {
    const arr: number[] = dashboard.map(i => i.gridItem.y)
    return arr.length ? Math.max.apply(null, arr) : -1
  }
  createLabel(attribute: Atribute, y: number) {
    // console.log(y);
    // console.log('createLabel', attribute);
    const gridItem: GridsterItem = { cols: 5, rows: 1, x: 0, y }
    return new DynLabel({
      gridItem,
      value: attribute.name
    })
  }
  createControl(attribute: Atribute, y: number) {
    console.log(y);
    console.log('createControl', attribute);

  }

}

/*
  name: string;
  label?: string;
  Type: string;
  readonly?: boolean;
  valueKey?: string;
  notRequired?: boolean;
*/
/*
TemplateName
StartTime
EndTime
EventName
Attributes
*/

/*
Timestemp
Attributes
*/

/*
0: {name: "MaxTemperature", type: "System.Double"}
1: {name: "Weight", type: "System.Int32"}
2: {name: "Product", type: "System.String"}
*/