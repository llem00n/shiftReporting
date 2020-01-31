import { Injectable } from '@angular/core';
import { ListData } from '../components/list/list.component';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { Department } from 'src/app/app-store/department/department.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  createList(data: Array<Plant | Department>, actionButtons?: { key: string, title: string }[]): ListData {
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
