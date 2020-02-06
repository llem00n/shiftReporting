import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppHttpResponse, HttpService, AppHttpRequest } from '../services/http.service';
import { Shift } from './shift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftHttpService {

  baseUrl = 'shifts/'

  constructor(private httpService: HttpService) { }

  addShift(shift: Shift): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addShift',
      payload: { shift },
      loadingMsg: 'Adding the shift ...',
      successMsg: `Shift has been added`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateShift(shift: Shift): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateShift',
      payload: { shift },
      loadingMsg: 'Updating the shift ...',
      successMsg: `Shift has been updated`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  deleteShift(shiftId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'deleteShift',
      payload: { shiftId },
      loadingMsg: 'Deleteing the shift ...',
      successMsg: `Shift has been delited`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  getShifts(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getShifts',
      // payload: { departmentId },
      loadingMsg: 'Loading the shifts ...',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
