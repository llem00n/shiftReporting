import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PlantEffects } from './plant.effects';

describe('PlantEffects', () => {
  let actions$: Observable<any>;
  let effects: PlantEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlantEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<PlantEffects>(PlantEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
