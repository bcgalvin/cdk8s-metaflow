import { Helm } from 'cdk8s';
import { Construct } from 'constructs';
import { k8s } from '..';
import { IntOrString } from '../imports/k8s';
import { MetadataDatabaseOptions, MetaflowServiceOptions, MetaflowUIOptions } from './interfaces';

type ChartValues = MetadataDatabaseOptions | MetaflowServiceOptions | MetaflowUIOptions;

export interface HelmChartOptions {
  readonly chart: string;
  readonly chartValues?: ChartValues;
  readonly chartVersion: string;
  readonly releaseName: string;
}

export abstract class HelmChart extends Construct {
  protected readonly helm: Helm;

  constructor(scope: Construct, id: string, props: HelmChartOptions) {
    super(scope, id);

    const chartValues = props.chartValues ?? {
      enabled: true,
      auth: {
        database: 'metaflow',
        password: 'metaflow',
        username: 'metaflow',
      },
    };
    this.helm = new Helm(this, 'postgres', {
      chart: props.chart,
      releaseName: props.releaseName,
      helmFlags: ['--version', props.chartVersion],
      values: { ...chartValues },
    });
  }
}

export class MetaflowService extends HelmChart {
  constructor(scope: Construct, id: string, props: HelmChartOptions) {
    super(scope, id, props);

    new k8s.Service(this, 'postgres-local-service', {
      metadata: {
        name: 'release-name-postgresql',
        labels: {
          'app.kubernetes.io/name': 'postgresql',
          'app.kubernetes.io/instance': 'release-name',
        },
      },
      spec: {
        ports: [
          {
            name: 'postgresql',
            port: 5432,
            targetPort: IntOrString.fromString('postgresql'),
            protocol: 'TCP',
          },
        ],
        clusterIp: 'None',
      },
    });

    new k8s.Endpoints(this, 'postgres-local-endpoints', {
      metadata: {
        name: 'release-name-postgresql',
        labels: {
          'app.kubernetes.io/name': 'postgresql',
          'app.kubernetes.io/instance': 'release-name',
        },
      },
      subsets: [
        {
          addresses: [
            {
              ip: '192.168.65.2', // for minikube
            },
          ],
          ports: [
            {
              name: 'postgresql',
              port: 5432,
              protocol: 'TCP',
            },
          ],
        },
      ],
    });
  }
}
