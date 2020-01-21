import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/modules/message/sevices/message.service';

export interface HttpRequest {
  // method: string,
  url: string,
  payload?: Object
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

  post<T>(options: HttpRequest): Observable<T | null> {
    console.log('showSnackBar loading');
    this.message.loadingMessage('Loading something...')
    const url = `${this.baseUrl}/${options.url}`
    const payload = options.payload || {}
    return this.http.post<T>(url, payload).pipe(
      tap(_ => this.message.closeSnackBar()),
      catchError(error => {
        console.log('showSnackBar Error');
        return of(null)
      })
    )
  }
  get(options: HttpRequest): Observable<any> {
    const url = `${this.baseUrl}/${options.url}`
    return this.http.get(url)
  }
}
