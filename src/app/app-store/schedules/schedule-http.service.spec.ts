import { TestBed } from '@angular/core/testing';

import { ScheduleHttpService } from './schedule-http.service';

describe('ScheduleHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduleHttpService = TestBed.get(ScheduleHttpService);
    expect(service).toBeTruthy();
  });
});
