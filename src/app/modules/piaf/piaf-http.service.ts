import { Injectable } from '@angular/core';
import { AppHttpRequest, AppHttpResponse, HttpService } from 'src/app/services/http/http.service';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiafHttpService {
  baseUrl = 'piaf/'

  constructor(
    private httpService: HttpService
  ) { }

  getServers(): Observable<string[]> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getServers',
      loadingMsg: 'Loading servers ...',
    }
    return this.httpService.post<AppHttpResponse>(options)
      .pipe(
        filter(resp => resp && resp.status === 200),
        map(resp => resp.body),
      )
  }

  getDatabases(serverName: string): Observable<string[]> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDatabases',
      loadingMsg: 'Loading databases ...',
      payload: { serverName }
    }
    return this.httpService.post<AppHttpResponse>(options)
      .pipe(
        filter(resp => resp && resp.status === 200),
        map(resp => resp.body),
      )

  }	//<string>databaes

  getDatabaseElements(payload: { serverName: string, databaseName: string }) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDatabaseElements',
      loadingMsg: 'Loading databases ...',
      payload,
    }
    return this.httpService.post<AppHttpResponse>(options)
      .pipe(
        filter(resp => resp && resp.status === 200),
        map(resp => resp.body),
      )
  } //<string>elements

  getDatabaseEventFrameTemplates(payload: { serverName: string, databaseName: string }): Observable<string[]> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getDatabaseEventFrameTemplates',
      loadingMsg: 'Loading databases ...',
      payload,
    }
    return this.httpService.post<AppHttpResponse>(options)
      .pipe(
        filter(resp => resp && resp.status === 200),
        map(resp => resp.body),
      )
  }// < string > templatesNames

  getElementStructure(elementFullPath: string) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getElementStructure',
      loadingMsg: 'Loading databases ...',
      payload: { elementFullPath }
    }
    return this.httpService.post<AppHttpResponse>(options)
      .pipe(
        filter(resp => resp && resp.status === 200),
        map(resp => resp.body),
      )
  }//	piafElement: PiAfElement
}
