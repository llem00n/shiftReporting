import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ScheduleEffects } from './schedule.effects';

describe('ScheduleEffects', () => {
  let actions$: Observable<any>;
  let effects: ScheduleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ScheduleEffects>(ScheduleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
