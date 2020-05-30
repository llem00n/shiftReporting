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

  ngOnInit() {
    this.store.pipe(
      select(dataEntryLogs),
      filter(data => !!data.length)
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
        case 'recordDate': return compare(a.recordDate, b.recordDate, isAsc);
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
