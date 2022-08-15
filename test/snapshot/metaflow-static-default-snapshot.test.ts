import { Chart, Testing } from 'cdk8s';
import { ServiceAccount, ServiceType } from 'cdk8s-plus-22';
import { MetaflowUIStaticChart } from '../../src/';

describe('metaflow static', () => {
  test('default snapshot', () => {
    const app = Testing.app();
    const baseChart = new Chart(app, 'base');
    const sa = new ServiceAccount(baseChart, 'metaflow-static-sa', {});

    // GIVEN
    const chart = new MetaflowUIStaticChart(app, 'test-service', {
      serviceAccount: sa,
      image: 'public.ecr.aws/outerbounds/metaflow_ui',
      imageTag: 'v1.1.2',
      serviceType: ServiceType.NODE_PORT,
    });
    // THEN
    expect(chart).toMatchSnapshot();
  });
});
