import * as fromChecklist from './checklist.reducer';
import { selectChecklistState } from './checklist.selectors';

describe('Checklist Selectors', () => {
  it('should select the feature state', () => {
    const result = selectChecklistState({
      [fromChecklist.checklistFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
