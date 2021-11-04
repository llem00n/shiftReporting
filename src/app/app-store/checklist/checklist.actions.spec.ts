import * as fromChecklist from './checklist.actions';

describe('loadChecklists', () => {
  it('should return an action', () => {
    expect(fromChecklist.loadChecklists().type).toBe('[Checklist] Load Checklists');
  });
});
