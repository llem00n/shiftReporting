import { Injectable } from '@angular/core';
import { DataEntry } from '@models/';
import { Observable, of } from 'rxjs';
import { AppHttpResponse, AppHttpRequest, HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DataEntryHttpService {
  baseUrl = 'dataentries/'

  constructor(private httpService: HttpService) { }

  addDataEntry(dataEntry: DataEntry): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addDataEntry',
      payload: { dataEntry },
      loadingMsg: 'Adding the dataEntry ...',
      successMsg: `DataEntry has been added`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  getLatestDataEntry(shiftID: number): Observable<AppHttpResponse> {
    return of(null)
  }

  getDataEntriesOnDate(departmentId: number, fromDate: string, toDate: string): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDataEntriesOnDate',
      payload: { departmentId, fromDate, toDate },
      loadingMsg: 'Loading data entries ...',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateDataEntry(dataEntry: DataEntry): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateDataEntry',
      payload: { dataEntry },
      loadingMsg: 'Updating the dataEntry ...',
      successMsg: `DataEntry has been updated`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  submitDataEntry(dataEntry: DataEntry): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'submitDataEntry',
      payload: { dataEntry },
      loadingMsg: 'Submitting the dataEntry ...',
      successMsg: `DataEntry has been submitted`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
