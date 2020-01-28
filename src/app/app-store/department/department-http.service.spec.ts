import { TestBed } from '@angular/core/testing';

import { DepartmentHttpService } from './department-http.service';

describe('DepartmentHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentHttpService = TestBed.get(DepartmentHttpService);
    expect(service).toBeTruthy();
  });
});
