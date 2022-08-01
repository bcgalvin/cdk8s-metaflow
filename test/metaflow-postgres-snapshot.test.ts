import { MetaflowService } from '../src';
// @ts-ignore
import { synth } from './util';

describe('metaflow service', () => {
  test('postgres snapshot', () => {
    // GIVEN
    const chart = synth(MetaflowService, { postgresEnabled: true });
    // THEN
    expect(chart).toMatchSnapshot();
  });
});
