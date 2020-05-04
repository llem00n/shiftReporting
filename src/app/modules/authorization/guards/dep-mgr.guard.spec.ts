import { TestBed } from '@angular/core/testing';

import { DepMgrGuard } from './dep-mgr.guard';

describe('DepMgrGuard', () => {
  let guard: DepMgrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DepMgrGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
