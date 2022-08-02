import { App, Chart } from 'cdk8s';
import { MetaflowService } from '../src';

const app = new App();
const chart = new Chart(app, 'integ-metaflow-service-chart');

new MetaflowService(chart, 'metaflow-service', {
  postgresEnabled: true,
  ingressEnabled: true,
});

app.synth();
