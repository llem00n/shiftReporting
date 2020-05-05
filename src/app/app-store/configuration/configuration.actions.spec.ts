import * as fromConfiguration from './configuration.actions';

describe('loadConfigurations', () => {
  it('should return an action', () => {
    expect(fromConfiguration.loadConfigurations().type).toBe('[Configuration] Load Configurations');
  });
});
