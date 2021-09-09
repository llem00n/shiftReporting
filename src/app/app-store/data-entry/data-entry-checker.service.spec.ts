import { TestBed } from '@angular/core/testing';

import { DataEntryCheckerService } from './data-entry-checker.service';

describe('DataEntryCheckerService', () => {
  let service: DataEntryCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEntryCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
