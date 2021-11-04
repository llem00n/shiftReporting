import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http/http.service';
import { getPendingDataEntries } from './data-entry.actions';

@Injectable({
  providedIn: 'root'
})
export class DataEntryCheckerService {
  userId:string;
  start(timeout: number = 5000, userId: string) {
    this.userId = userId;
    this.check(timeout);
  }

  private check(timeout: number) {
    this.store.dispatch(getPendingDataEntries({userId: this.userId, inBackground: true}));
    setTimeout(_ => this.check(timeout), timeout);
  }

  constructor(
    private store: Store,
  ) { }
}
