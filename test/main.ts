import { App, Chart, ChartProps } from 'cdk8s';
import { Namespace, ServiceType } from 'cdk8s-plus-21';
import { Construct } from 'constructs';
import { MetaflowServiceChart, MetaflowUIChart, MetaflowUIStaticChart, PostgresAddon } from '../src/';

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

const metadataDB = new PostgresAddon({
  chartVersion: '11.7.1',
  namespaceName: 'metaflow',
});
const helm = metadataDB.install(baseChart);

const serviceChart = new MetaflowServiceChart(app, 'test-service', {
  namespaceName: 'metaflow',
  image: 'public.ecr.aws/outerbounds/metaflow_metadata_service',
  imageTag: 'v2.3.0',
  initImage: 'netflixoss/metaflow_metadata_service',
  initImageTag: 'v2.3.0',
  serviceType: ServiceType.CLUSTER_IP,
});

const uiChart = new MetaflowUIChart(app, 'test-ui', {
  namespaceName: 'metaflow',
  image: 'netflixoss/metaflow_metadata_service',
  imageTag: 'v2.3.0',
  serviceType: ServiceType.CLUSTER_IP,
});

const staticChart = new MetaflowUIStaticChart(app, 'test-static', {
  namespaceName: 'metaflow',
  image: 'public.ecr.aws/outerbounds/metaflow_ui',
  imageTag: 'v1.1.2',
  serviceType: ServiceType.NODE_PORT,
});

serviceChart.addDependency(helm);
uiChart.addDependency(serviceChart);
staticChart.addDependency(serviceChart);

app.synth();
