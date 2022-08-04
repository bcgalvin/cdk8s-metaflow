import { MetadataDatabase } from '../../src';
// @ts-ignore
import { synth } from '../util';

describe('metadata database', () => {
  test('default snapshot', () => {
    // GIVEN
    const chart = synth(MetadataDatabase, {
      chartVersion: '10.16.2',
    });
    // THEN
    expect(chart).toMatchSnapshot();
  });
});
