import { Chart, Testing } from 'cdk8s';
import { ServiceAccount, ServiceType } from 'cdk8s-plus-22';
import { MetaflowServiceChart } from '../../src/';

describe('metaflow service', () => {
  test('default snapshot', () => {
    const app = Testing.app();
    const baseChart = new Chart(app, 'base');
    const sa = new ServiceAccount(baseChart, 'metaflow-service-sa', {});

    // GIVEN
    const chart = new MetaflowServiceChart(app, 'test-service', {
      serviceAccount: sa,
      image: 'public.ecr.aws/outerbounds/metaflow_metadata_service',
      imageTag: 'v2.3.0',
      serviceType: ServiceType.CLUSTER_IP,
    });
    // THEN
    expect(chart).toMatchSnapshot();
  });
});
