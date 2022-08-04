// @ts-ignore
import { Chart, Testing } from 'cdk8s';
import { ImagePullPolicy, MetaflowService } from '../src';
// @ts-ignore
import { synth } from './util';

describe('helm', () => {
  test('setting version flag works', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'default');
    new MetaflowService(chart, 'metaflow-service', { chartVersion: '0.1.2' });
    const resources = Testing.synth(chart);
    // THEN
    const deployment = resources.find((obj) => obj.kind === 'Deployment');
    expect(deployment.metadata.labels['helm.sh/chart']).toEqual('metaflow-service-0.1.2');
  });

  test('setting chart values at root level works', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'default');
    new MetaflowService(chart, 'metaflow-service', {
      chartVersion: '0.1.2',
      chartValues: {
        replicaCount: 2,
        nameOverride: 'metaflow-service-2',
      },
    });
    const resources = Testing.synth(chart);
    // THEN
    const deployment = resources.find((obj) => obj.kind === 'Deployment');
    expect(deployment.spec.replicas).toEqual(2);
    expect(deployment.metadata.labels['app.kubernetes.io/name']).toEqual('metaflow-service-2');
  });

  test('setting interface chart values works', () => {
    // GIVEN
    const app = Testing.app();
    const chart = new Chart(app, 'default');
    new MetaflowService(chart, 'metaflow-service', {
      chartVersion: '0.1.2',
      chartValues: {
        image: {
          repository: 'nginx',
          tag: 'test-tag',
          pullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
        },
      },
    });
    const resources = Testing.synth(chart);
    // THEN
    const deployment = resources.find((obj) => obj.kind === 'Deployment');
    expect(deployment.spec.template.spec.containers[0].image).toEqual('nginx:test-tag');
  });
});
