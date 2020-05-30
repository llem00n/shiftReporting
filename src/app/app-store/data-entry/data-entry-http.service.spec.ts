import { TestBed } from '@angular/core/testing';

import { DataEntryHttpService } from './data-entry-http.service';

describe('DataEntryHttpService', () => {
  let service: DataEntryHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEntryHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
