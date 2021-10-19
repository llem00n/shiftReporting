import { TestBed } from '@angular/core/testing';

import { ChecklistHttpService } from './checklist-http.service';

describe('ChecklistHttpService', () => {
  let service: ChecklistHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
