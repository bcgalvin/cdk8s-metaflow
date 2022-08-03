import { MetaflowService } from '../../src';
// @ts-ignore
import { synth } from '../util';

describe('metaflow service', () => {
  test('default snapshot', () => {
    // GIVEN
    const chart = synth(MetaflowService, {
      chartVersion: '0.1.2',
    });
    // THEN
    expect(chart).toMatchSnapshot();
  });
});
