import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ConfigurationEffects } from './configuration.effects';

describe('ConfigurationEffects', () => {
  let actions$: Observable<any>;
  let effects: ConfigurationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ConfigurationEffects>(ConfigurationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
