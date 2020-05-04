import { TestBed } from '@angular/core/testing';

import { PlantMgrGuard } from './plant-mgr.guard';

describe('PlantMgrGuard', () => {
  let guard: PlantMgrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlantMgrGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
