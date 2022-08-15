import { Chart, Testing } from 'cdk8s';
import { ServiceAccount, ServiceType } from 'cdk8s-plus-22';
import { MetaflowUIChart } from '../../src/';

describe('metaflow ui', () => {
  test('default snapshot', () => {
    const app = Testing.app();
    const baseChart = new Chart(app, 'base');
    const sa = new ServiceAccount(baseChart, 'metaflow-ui-sa', {});

    // GIVEN
    const chart = new MetaflowUIChart(app, 'test-service', {
      serviceAccount: sa,
      image: 'netflixoss/metaflow_metadata_service',
      imageTag: 'v2.3.0',
      serviceType: ServiceType.CLUSTER_IP,
    });
    // THEN
    expect(chart).toMatchSnapshot();
  });
});
