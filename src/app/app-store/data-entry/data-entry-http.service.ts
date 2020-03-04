import { Injectable } from '@angular/core';
import { DataEntry } from '@models/';
import { Observable, of } from 'rxjs';
import { AppHttpResponse } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class DataEntryHttpService {

  constructor() { }

  addDataEntry(dataEntry: DataEntry, userLogin: string): Observable<AppHttpResponse> {
    return of(null)
  }

  getLatestDataEntry(shiftID: number): Observable<AppHttpResponse> {
    return of(null)
  }

  getDataEntriesOnDate(shiftID: number, fromDate: string, toDate: string): Observable<AppHttpResponse> {
    return of(null)
  }

  updateDataEntry(dataEntry: DataEntry, userLogin: string): Observable<AppHttpResponse> {
    return of(null)
  }

  submitDataEntry(dataEntry: DataEntry, userLogin: string): Observable<AppHttpResponse> {
    return of(null)
  }
}
