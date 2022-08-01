import { Chart, Testing } from 'cdk8s';
import { MetaflowService } from '../src';

const metadata = {
  'helm.sh/chart': 'metaflow-service-0.2.0',
  'app.kubernetes.io/name': 'metaflow-service',
  'app.kubernetes.io/instance': 'release-name',
  'app.kubernetes.io/version': '2.2.4',
  'app.kubernetes.io/managed-by': 'Helm',
};

describe('metaflow service', () => {
  test('defaults', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'default');
    // WHEN
    new MetaflowService(chart, 'default-service');
    // THEN
    expect(Testing.synth(chart)).toMatchSnapshot();
  });

  test('defaults can be overridden', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'override');
    // WHEN
    new MetaflowService(chart, 'override-service', {
      serviceAccountName: 'override-sa',
    });
    // THEN
    const resources = Testing.synth(chart);
    for (const sa of resources.filter((r) => r.kind === 'ServiceAccount')) {
      expect(sa.metadata.name).toEqual('override-sa');
    }
    for (const svc of resources.filter((r) => r.kind === 'Service')) {
      expect(svc.metadata.name).toEqual('override-sa');
    }
  });

  test('metadata', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'metadata');
    // WHEN
    new MetaflowService(chart, 'metadata-service');
    // THEN
    const resources = Testing.synth(chart);
    for (const sa of resources.filter((r) => r.kind === 'ServiceAccount')) {
      expect(sa.metadata.labels).toEqual(metadata);
    }
    for (const svc of resources.filter((r) => r.kind === 'Service')) {
      expect(svc.metadata.labels).toEqual(metadata);
    }
  });
});
