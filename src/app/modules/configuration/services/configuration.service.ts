import { Injectable } from '@angular/core';
import { ListData } from '../components/list/list.component';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { Department } from 'src/app/app-store/department/department.model';
import { Shift } from 'src/app/app-store/shift/shift.model';
import { Schedule } from 'src/app/app-store/models';
import { Template } from 'src/app/app-store/template/template.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  createList(data: Array<Plant | Department | Shift | Schedule | Template>, actionButtons?: { key: string, title: string }[]): ListData {
    const list = <ListData>{};
    list.tableData = data;
    list.head = data.length ? Object.keys(data[0]).map(i => {
      return {
        key: i, title: i
      }
    }) : [];
    list.actionButtons = data.length ? actionButtons || [
      { key: 'edit', title: 'Edit' },
      { key: 'dlt', title: 'DLT' }
    ] : null;
    return list;
  }

}
