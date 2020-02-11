import { TestBed } from '@angular/core/testing';

import { InterfaceHttpService } from './interface-http.service';

describe('InterfaceHttpService', () => {
  let service: InterfaceHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
