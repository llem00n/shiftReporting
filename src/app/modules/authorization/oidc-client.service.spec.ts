import { TestBed } from '@angular/core/testing';

import { OidcClientService } from './oidc-client.service';

describe('OidcClientService', () => {
  let service: OidcClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OidcClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
