import { Construct } from 'constructs';
import { App, Chart, ChartProps } from 'cdk8s';
import { MetaflowService } from 'cdk8s-metaflow';

export class MetaflowServiceChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new MetaflowService(this, 'metaflow-service', {
      postgresEnabled: true,
      ingressEnabled: true,
    });
  }
}

const app = new App();
new MetaflowServiceChart(app, 'postgres');
app.synth();
