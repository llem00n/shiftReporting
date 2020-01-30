import { Injectable } from '@angular/core';
import { ListData } from '../components/list/list.component';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { Department } from 'src/app/app-store/department/department.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  createList(data: Array<Plant | Department>): ListData {
    const list = <ListData>{};
    list.tableData = data;
    list.head = Object.keys(data[0]).map(i => {
      return {
        key: i, title: i
      }
    })
    list.actionButtons = [
      { key: 'edit', title: 'Edit' },
      { key: 'dlt', title: 'DLT' }
    ]
    return list;
  }

}
