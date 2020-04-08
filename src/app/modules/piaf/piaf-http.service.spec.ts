import { TestBed } from '@angular/core/testing';

import { PiafHttpService } from './piaf-http.service';

describe('PiafHttpService', () => {
  let service: PiafHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiafHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
