import { App, Chart } from 'cdk8s';
import { MetaflowUI } from '../../src';

const app = new App();
const chart = new Chart(app, 'integ-metaflow-ui-chart');

new MetaflowUI(chart, 'metaflow-ui', {
  chartVersion: '0.1.2',
});

app.synth();
