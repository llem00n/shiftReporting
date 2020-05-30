import { TestBed } from '@angular/core/testing';

import { ConfigurationHttpService } from './configuration-http.service';

describe('ConfigurationHttpService', () => {
  let service: ConfigurationHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
