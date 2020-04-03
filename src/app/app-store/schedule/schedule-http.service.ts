import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppHttpResponse, HttpService, AppHttpRequest } from '../../services/http/http.service';
import { Schedule } from './schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleHttpService {
  baseUrl = 'schedules/'

  constructor(private httpService: HttpService) { }

  addSchedule(schedule: Schedule): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addSchedule',
      payload: { schedule },
      loadingMsg: 'Adding the schedule ...',
      successMsg: `Schedule has been added`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updateSchedule(schedule: Schedule) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updateSchedule',
      payload: { schedule },
      loadingMsg: 'Updating the schedule ...',
      successMsg: `Schedule has been updated`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  deleteSchedule(scheduleId) {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'deleteSchedule',
      payload: { scheduleId },
      loadingMsg: 'Deleteing the schedule ...',
      successMsg: `Schedule has been delited`
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
  getSchedule() { }

  getSchedules(departmentId: number): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getSchedules',
      payload: { departmentId },
      loadingMsg: 'Loading the schedule ...',
    }
    return this.httpService.post<AppHttpResponse>(options);

    // return of({
    //   status: 200,
    //   body: [
    //     <Schedule>{
    //       ScheduleID: 1,
    //       DepartmentID: 4,
    //       ShiftID: 2,
    //       StartTime: "0111-11-11T09:08:56",
    //       EndTime: "0011-11-11T09:08:56Z",
    //       RecurEveryWeeks: 1,
    //       Monday: true,
    //       Tuesday: false,
    //       Wednesday: true,
    //       Thursday: false,
    //       Friday: false,
    //       Saturday: false,
    //       Sunday: false,
    //     },
    //     // <Schedule>{},
    //     // <Schedule>{},
    //   ]
    // });
    return of(null)
  }
}
