import { MetaflowService } from '../src';
// @ts-ignore
import { synth } from './util';

const metadata = {
  'helm.sh/chart': 'metaflow-service-0.2.0',
  'app.kubernetes.io/name': 'metaflow-service',
  'app.kubernetes.io/instance': 'release-name',
  'app.kubernetes.io/version': '2.2.4',
  'app.kubernetes.io/managed-by': 'Helm',
};

describe('metaflow service', () => {
  test('defaults snapshot', () => {
    // GIVEN
    const chart = synth(MetaflowService);
    // THEN
    expect(chart).toMatchSnapshot();
  });

  test('defaults can be overridden', () => {
    // GIVEN
    const resources = synth(MetaflowService, {
      serviceAccountName: 'override-sa',
    });
    // THEN
    for (const sa of resources.filter((r) => r.kind === 'ServiceAccount')) {
      expect(sa.metadata.name).toEqual('override-sa');
    }
    for (const svc of resources.filter((r) => r.kind === 'Service')) {
      expect(svc.metadata.name).toEqual('override-sa');
    }
  });

  test('default metadata is set properly', () => {
    // GIVEN
    const resources = synth(MetaflowService);
    // THEN
    for (const sa of resources.filter((r) => r.kind === 'ServiceAccount')) {
      expect(sa.metadata.labels).toEqual(metadata);
    }
    for (const svc of resources.filter((r) => r.kind === 'Service')) {
      expect(svc.metadata.labels).toEqual(metadata);
    }
  });
});
