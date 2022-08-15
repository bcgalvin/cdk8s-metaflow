import { App, Chart } from 'cdk8s';
import { ServiceAccount, ServiceType } from 'cdk8s-plus-22';
import { MetaflowUIStaticChart } from '../../src/';

const app = new App();
const baseChart = new Chart(app, 'base');
const sa = new ServiceAccount(baseChart, 'metaflow-static-sa', {});
new MetaflowUIStaticChart(app, 'test-static', {
  serviceAccount: sa,
  image: 'public.ecr.aws/outerbounds/metaflow_ui',
  imageTag: 'v1.1.2',
  serviceType: ServiceType.CLUSTER_IP,
});

app.synth();
