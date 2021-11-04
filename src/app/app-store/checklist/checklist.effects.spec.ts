import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ChecklistEffects } from './checklist.effects';

describe('ChecklistEffects', () => {
  let actions$: Observable<any>;
  let effects: ChecklistEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChecklistEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ChecklistEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
