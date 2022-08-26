import { App, Chart, ChartProps } from 'cdk8s';
import { Namespace, Protocol } from 'cdk8s-plus-21';
import { Construct } from 'constructs';
import { LocalPostgresAddon, MetaflowService } from '../src';

const app = new App();

export class DefaultChart extends Chart {
  // @ts-ignore
  constructor(scope: Construct, name: string, props?: ChartProps) {
    super(scope, name);
    new Namespace(this, 'namespace', {
      metadata: {
        name: 'metaflow',
      },
    });
  }
}

const baseChart = new DefaultChart(app, 'base-chart');

const metadataDB = new LocalPostgresAddon({
  endpointIp: '192.168.65.2', // local: minikube ssh 'grep host.minikube.internal /etc/hosts | cut -f1'
  namespaceName: 'metaflow',
});
const helm = metadataDB.install(baseChart);

const serviceChart = new MetaflowService(app, 'test-service', {
  namespace: 'metaflow',
  image: 'public.ecr.aws/outerbounds/metaflow_metadata_service',
  imageTag: 'v2.3.0',
  initImage: 'netflixoss/metaflow_metadata_service',
  initImageTag: 'v2.3.0',
  servicePort: {
    name: 'http',
    protocol: Protocol.TCP,
    port: 8080,
  },
});

serviceChart.node.addDependency(helm);
app.synth();
