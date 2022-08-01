import { MetaflowService } from '../src';
// @ts-ignore
import { synth } from './util';

describe('metaflow service', () => {
  test('default snapshot', () => {
    // GIVEN
    const chart = synth(MetaflowService);
    // THEN
    expect(chart).toMatchSnapshot();
  });
});
