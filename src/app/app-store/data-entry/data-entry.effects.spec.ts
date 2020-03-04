import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DataEntryEffects } from './data-entry.effects';

describe('DataEntryEffects', () => {
  let actions$: Observable<any>;
  let effects: DataEntryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataEntryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<DataEntryEffects>(DataEntryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
