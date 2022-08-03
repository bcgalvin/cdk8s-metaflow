// @ts-ignore
import { MetaflowService } from '../src';
// @ts-ignore
import { synth } from './util';

describe('helm', () => {
  test('setting version flag works', () => {
    // GIVEN
    const resources = synth(MetaflowService, {
      chartVersion: '0.1.2',
    });
    // THEN
    for (const sa of resources.filter((r) => r.kind === 'ServiceAccount')) {
      sa.metadata.labels['helm.sh/chart'] = 'metaflow-service-0.1.2';
    }
  });
});
