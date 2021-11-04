import { Injectable } from '@angular/core';
import { HttpService, AppHttpRequest, AppHttpResponse } from '../../services/http/http.service';
import { FontFamily,FontSize} from './font.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontHttpService {
  constructor(private httpService: HttpService) { }

  addFontSize(fontSize: FontSize): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: 'fontSize/' + 'addFontSize',
      payload: { fontSize: fontSize},
      loadingMsg: 'Adding the font size ...',
      successMsg: `Font size has been added`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  getFontSizes(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: {},
      url: 'fontSize/' + 'getFontSizes',
      loadingMsg: 'Loading font sizes...',
      successMsg: 'Loaded font sizes',
      errorMsg: 'Failed to load font sizes',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  addFontFamily(fontFamily: FontFamily): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: 'fontFamily/' + 'addFontFamily',
      payload: { fontFamily: fontFamily},
      loadingMsg: 'Adding the font family ...',
      successMsg: `Font family has been added`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  getFontFamilies(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      payload: {},
      url: 'fontFamily/' + 'getFontFamilies',
      loadingMsg: 'Loading font families...',
      successMsg: 'Loaded font families',
      errorMsg: 'Failed to load font families'
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
