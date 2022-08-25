import { Chart, Duration } from 'cdk8s';
import { Deployment, ImagePullPolicy, Probe, Protocol, Service } from 'cdk8s-plus-21';
import { Construct } from 'constructs';
import merge from 'ts-deepmerge';
import { MetaflowDeployment } from './deployment';
import { MetaflowChartProps } from './interfaces';

export class MetaflowServiceChart extends Chart {
  public readonly deployment: Deployment;
  public readonly service: Service;

  constructor(scope: Construct, name: string, props: MetaflowChartProps) {
    super(scope, name);

    const defaultEnvVars = {
      MF_METADATA_DB_NAME: 'metaflow',
      MF_METADATA_DB_PORT: '5432',
      MF_METADATA_DB_PSWD: 'metaflow',
      MF_METADATA_DB_USER: 'metaflow',
      MF_METADATA_DB_HOST: 'release-name-postgresql',
    };

    const envVars = merge(defaultEnvVars, props.envVars ?? {});

    const deployment = new MetaflowDeployment(this, 'metaflow-service-deployment', {
      namespaceName: props.namespaceName,
      initContainer: {
        image: `${props.initImage}:${props.initImageTag}`,
        command: ['/opt/latest/bin/python3', '/root/run_goose.py', '--only-if-empty-db'],
        imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
      },
      container: {
        name: 'metaflow-service',
        image: `${props.image}:${props.imageTag}`,
        command: ['/opt/latest/bin/python3', '-m', 'services.metadata_service.server'],
        imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
        port: 8080,
        liveness: Probe.fromHttpGet('/ping', {
          initialDelaySeconds: Duration.seconds(30),
          periodSeconds: Duration.seconds(15),
        }),
        readiness: Probe.fromHttpGet('/ping', {
          initialDelaySeconds: Duration.seconds(30),
          periodSeconds: Duration.seconds(15),
        }),
      },
      envVars: envVars,
    });

    this.deployment = deployment.deployment;

    this.service = new Service(this, 'metaflow-service-service', {
      type: props.serviceType,
      ports: [
        {
          port: 8080,
          name: 'http',
          protocol: Protocol.TCP,
        },
        {
          port: 8082,
          name: 'upgrades',
          protocol: Protocol.TCP,
        },
      ],
    });

    this.service.addDeployment(this.deployment);
  }
}
