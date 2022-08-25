import { App, Chart } from 'cdk8s';
import { ServiceAccount, ServiceType } from 'cdk8s-plus-21';
import { MetaflowServiceChart } from '../../src/';

const app = new App();
const baseChart = new Chart(app, 'base');
const sa = new ServiceAccount(baseChart, 'metaflow-service-sa', {});
new MetaflowServiceChart(app, 'test-service', {
  serviceAccount: sa,
  image: 'public.ecr.aws/outerbounds/metaflow_metadata_service',
  imageTag: 'v2.3.0',
  serviceType: ServiceType.CLUSTER_IP,
});

app.synth();
