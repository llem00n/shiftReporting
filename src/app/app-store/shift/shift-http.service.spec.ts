import { TestBed } from '@angular/core/testing';

import { ShiftHttpService } from './shift-http.service';

describe('ShiftHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftHttpService = TestBed.get(ShiftHttpService);
    expect(service).toBeTruthy();
  });
});
