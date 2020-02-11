import { Injectable } from '@angular/core';
import { HttpService, AppHttpRequest, AppHttpResponse } from '../services/http.service';
import { Interface } from './interface.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterfaceHttpService {
  baseUrl = 'interface/';
  constructor(private httpService: HttpService) { }

  addInterface(intface: Interface): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addInterface',
      payload: { intface },
      loadingMsg: 'Adding the interface ...',
      successMsg: `Interface has been added`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateInterface(intface: Interface): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addInterface',
      payload: { intface },
      loadingMsg: 'Updating the interface ...',
      successMsg: `Interface has been updated`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  deleteInterface(interfaceID: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addInterface',
      payload: { interfaceID },
      loadingMsg: 'Deleting the interface ...',
      successMsg: `Interface has been deleted`
    }
    return this.httpService.post<AppHttpResponse>(options);
   }

  getInterfaceTypes(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addInterface',
      loadingMsg: 'Deleting the interface ...',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
