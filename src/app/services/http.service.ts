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

  baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient,
  ) { }

  post(options: HttpRequest): Observable<any> {
    const url = `${this.baseUrl}/${options.url}`
    const payload = options.payload || {}
    return this.http.post(url, payload)
  }
  get(options: HttpRequest): Observable<any> {
    const url = `${this.baseUrl}/${options.url}`
    return this.http.get(url)
  }
}
