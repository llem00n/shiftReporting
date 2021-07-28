import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/message/sevices/message.service';
import { waitForAsync } from '@angular/core/testing';
import { OidcClientService } from 'src/app/modules/authorization/oidc-client.service';

export interface AppHttpRequest {
  // method: string,
  url: string,
  payload?: Object,
  loadingMsg?: string,
  successMsg?: string,
}
export interface AppHttpResponse {
  body: any,
  status: number,
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: string = `${environment.baseUrl}/api`

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private oidcClientService: OidcClientService,
  ) { }

  post<T>(options: AppHttpRequest): Observable<AppHttpResponse> {
    options.loadingMsg && this.message.loadingMessage(options.loadingMsg);
    const url = `${this.baseUrl}/${options.url}`
    const payload = options.payload || {}
    let headers = new HttpHeaders({ 'Authorization': this.oidcClientService.getAuthorizationHeaderValue() });

    return this.http.post<T>(url, payload, { observe: 'response', headers }).pipe(
      tap(_ => this.message.alertMessage(options.successMsg)),
      map(resp => { return <AppHttpResponse>{ status: resp.status, body: resp.body } }),
      catchError((error: HttpErrorResponse) => {
        this.message.errorMessage(`${error.error.message || error.error.title}`);
        return of(null)
      })
    )
  }

  get(options: AppHttpRequest): Observable<any> {
    const url = `${this.baseUrl}/${options.url}`
    return this.http.get(url)
  }
}
