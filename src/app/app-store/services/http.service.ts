import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/message/sevices/message.service';
import { async } from '@angular/core/testing';

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
  ) { }

  post<T>(options: AppHttpRequest): Observable<AppHttpResponse> {
    options.loadingMsg && this.message.loadingMessage(options.loadingMsg);
    const url = `${this.baseUrl}/${options.url}`
    const payload = options.payload || {}
    return this.http.post<T>(url, payload, { observe: 'response' }).pipe(
      tap(_ => this.message.alertMessage(options.successMsg)),
      map(resp => { return <AppHttpResponse>{ status: resp.status, body: resp.body } }),
      catchError((error: HttpErrorResponse) => {
        this.message.errorMessage(`${error.statusText}... ${error.error}... ${error.message}`);
        // deleteDepartmentSucces(error);
        return of(null)
      })
    )
  }
  
  get(options: AppHttpRequest): Observable<any> {
    const url = `${this.baseUrl}/${options.url}`
    return this.http.get(url)
  }
}
