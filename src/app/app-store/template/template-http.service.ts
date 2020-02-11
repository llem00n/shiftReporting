import { Injectable } from '@angular/core';
import { Template } from './template.model';
import { Observable, of } from 'rxjs';
import { AppHttpResponse, AppHttpRequest, HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateHttpService {

  baseUrl = 'templates/'

  constructor(private httpService: HttpService) { }

  addTemplate(opt: { departmentID: number, template: Template }): Observable<AppHttpResponse> {
    const { departmentID, template } = opt;
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addTemplate',
      payload: { departmentID, template },
      loadingMsg: 'Adding the template ...',
      successMsg: `Template has been added`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateTemplate(template: Template): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateTemplate',
      payload: { template },
      loadingMsg: 'Updating the template ...',
      successMsg: `Template has been updated`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  getTemplates(departmentID: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getTemplates',
      payload: { departmentID },
      loadingMsg: 'Loading the templates...',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  getTemplateTypes(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getTemplateTypes',
      loadingMsg: 'Loading the template types...',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
