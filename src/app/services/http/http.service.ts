import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  ) { }

  post<T>(options: HttpRequest): Observable<T> {
    const url = `${this.baseUrl}/${options.url}`
    const payload = options.payload || {}
    return this.http.post<T>(url, payload)
  }
  get(options: HttpRequest): Observable<any> {
    const url = `${this.baseUrl}/${options.url}`
    return this.http.get(url)
  }
}
