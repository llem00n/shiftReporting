import { Injectable } from '@angular/core';
import { HttpService, AppHttpResponse, AppHttpRequest } from 'src/app/services/http/http.service';
import { Observable } from 'rxjs';
import { UpdateConfigurations } from './configuration.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationHttpService {
  baseUrl = 'configurations/';

  constructor(private httpService: HttpService) { }

  getConfigurations(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getConfigurations',
      loadingMsg: 'loading configurations ...',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  updateConfigurations(configurations: UpdateConfigurations[]): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateConfigurations',
      payload: { configurations },
      loadingMsg: 'Updating the configurations ...',
      successMsg: `Configurations has been updated`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
