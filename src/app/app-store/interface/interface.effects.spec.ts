import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InterfaceEffects } from './interface.effects';

describe('InterfaceEffects', () => {
  let actions$: Observable<any>;
  let effects: InterfaceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InterfaceEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<InterfaceEffects>(InterfaceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
