import { App, Chart } from 'cdk8s';
import { ServiceAccount, ServiceType } from 'cdk8s-plus-21';
import { MetaflowUIChart } from '../../src';

const app = new App();
const baseChart = new Chart(app, 'base');
const sa = new ServiceAccount(baseChart, 'metaflow-ui.ts-sa', {});
new MetaflowUIChart(app, 'test-ui', {
  serviceAccount: sa,
  image: 'netflixoss/metaflow_metadata_service',
  imageTag: 'v2.3.0',
  serviceType: ServiceType.CLUSTER_IP,
});

app.synth();
