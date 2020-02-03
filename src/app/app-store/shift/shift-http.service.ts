import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppHttpResponse } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftHttpService {

  constructor() { }

  AddShift(): Observable<AppHttpResponse> {
    console.log('AddShift');
    return of(null)
  }

  UpdateShift(): Observable<AppHttpResponse> {
    console.log('UpdateShift');
    return of(null)
  }

  DeleteShift(): Observable<AppHttpResponse> {
    console.log('DeleteShift');
    return of(null)
  }

  GetShifts(): Observable<AppHttpResponse> {
    console.log('GetShifts');
    return of(null)
  }
}
