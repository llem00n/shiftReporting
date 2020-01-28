import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DepartmentEffects } from './department.effects';

describe('DepartmentEffects', () => {
  let actions$: Observable<any>;
  let effects: DepartmentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DepartmentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<DepartmentEffects>(DepartmentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
