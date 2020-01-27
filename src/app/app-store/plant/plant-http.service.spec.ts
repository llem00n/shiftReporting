import { TestBed } from '@angular/core/testing';

import { PlantHttpService } from './plant-http.service';

describe('PlantHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantHttpService = TestBed.get(PlantHttpService);
    expect(service).toBeTruthy();
  });
});
