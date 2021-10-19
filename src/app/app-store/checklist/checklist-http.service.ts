import { Injectable } from '@angular/core';
import { AppHttpRequest, AppHttpResponse, HttpService } from 'src/app/services/http/http.service';
import { ChecklistItem } from './checklist-item.model';
import { ChecklistDataEntry } from './data-entry.model';

@Injectable({
  providedIn: 'root'
})
export class ChecklistHttpService {
  baseUrl = 'checklists/'

  constructor(
    private http: HttpService
  ) { }

  getChecklist(scheduleId: number) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'GetChecklist',
      payload: { scheduleId },
      loadingMsg: 'Loading the checklist...',
      successMsg: `The checklist has been loaded`,
      errorMsg: 'Failed to load the checklist',
    }
    return this.http.post<AppHttpResponse>(options);
  }

  updateChecklist(items: ChecklistItem[], scheduleId: number) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'UpdateChecklist',
      payload: { items, scheduleId },
      loadingMsg: 'Updating the checklist...',
      successMsg: `The checklist has been updated`,
      errorMsg: 'Failed to udate the checklist',
    }
    return this.http.post<AppHttpResponse>(options);
  }

  getDataEntry(scheduleId: number, userId: string, date: Date) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'GetChecklistDataEntry',
      payload: { scheduleId, userId, date },
      loadingMsg: 'Loading the checklist data entry...',
      successMsg: `The checklist date entry has been loaded`,
      errorMsg: 'Failed to load the checklist data entry',
    }
    return this.http.post<AppHttpResponse>(options);
  }

  updateDataEntry(dataEntry: ChecklistDataEntry) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'UpdateChecklistDataEntry',
      payload: { dataEntry },
      loadingMsg: 'Updating the checklist data entry...',
      successMsg: `The checklist data entry has been updated`,
      errorMsg: 'Failed to udate the checklist data entry',
    }
    return this.http.post<AppHttpResponse>(options);
  }
}
