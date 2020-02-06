import { TestBed } from '@angular/core/testing';

import { TemplateHttpService } from './template-http.service';

describe('TemplateHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateHttpService = TestBed.get(TemplateHttpService);
    expect(service).toBeTruthy();
  });
});
