import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { State, DataEntryLog } from '@models/*';
import { dataEntryLogs } from '../../../../app-store/index';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-data-entry-log',
  templateUrl: './data-entry-log.component.html',
  styleUrls: ['./data-entry-log.component.scss']
})
export class DataEntryLogComponent implements OnInit {

  logs: DataEntryLog[];
  sortedData: DataEntryLog[];

  constructor(
    private store: Store<State>
  ) {
  }
  getLocalDate(dateStr) {
    return new Date(dateStr).toLocaleString()
  }

  valueToDate(value) {
    if (typeof (value) !== 'string'
      || !/\d{4}-0[0-9]|1[0-2]-[0-2][0-9]|3[0-1]T[0-1][0-9]|2[0-4]:[0-5][0-9]/.test(value)) return value;
    const date = new Date(value).toLocaleString();
    if (date === 'Invalid Date') return value;
    return date;
  }

  ngOnInit() {
    this.store.pipe(
      select(dataEntryLogs),
      filter(data => !!data)
    ).subscribe(logs => {
      this.logs = logs;
      this.sortedData = logs.slice();
    })
  }



  sortData(sort: Sort) {
    const data = this.logs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'controlName': return compare(a.controlName, b.controlName, isAsc);
        case 'recordDate': return compare(new Date(a.recordDate).valueOf(), new Date(b.recordDate).valueOf(), isAsc);
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'value': return compare(a.value, b.value, isAsc);
        // case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
