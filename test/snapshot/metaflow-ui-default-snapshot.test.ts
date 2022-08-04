import { MetaflowUI } from '../../src';
// @ts-ignore
import { synth } from '../util';

describe('metaflow ui', () => {
  test('default snapshot', () => {
    // GIVEN
    const chart = synth(MetaflowUI, {
      chartVersion: '0.1.2',
    });
    // THEN
    expect(chart).toMatchSnapshot();
  });
});
