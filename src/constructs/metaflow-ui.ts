import { Chart, Duration } from 'cdk8s';
import { Deployment, ImagePullPolicy, Probe, Protocol, Service } from 'cdk8s-plus-21';
import { Construct } from 'constructs';
import merge from 'ts-deepmerge';
import { MetaflowDeployment } from './deployment';
import { MetaflowChartProps } from './interfaces';

export class MetaflowUIChart extends Chart {
  public readonly deployment: Deployment;
  public readonly service: Service;

  constructor(scope: Construct, name: string, props: MetaflowChartProps) {
    super(scope, name);

    const defaultEnvVars = {
      UI_ENABLED: '1',
      PATH_PREFIX: '/api',
      MF_DATASTORE_ROOT: 's3://metaflow-kube-tooling/data/',
      METAFLOW_DATASTORE_SYSROOT_S3: 's3://metaflow-kube-tooling/metaflow/',
      LOGLEVEL: 'DEBUG',
      METAFLOW_SERVICE_URL: 'http://localhost:8083/api/metadata',
      METAFLOW_DEFAULT_DATASTORE: 's3',
      METAFLOW_DEFAULT_METADATA: 'service',
      MF_METADATA_DB_NAME: 'metaflow',
      MF_METADATA_DB_PORT: '5432',
      MF_METADATA_DB_PSWD: 'metaflow',
      MF_METADATA_DB_USER: 'metaflow',
      MF_METADATA_DB_HOST: 'release-name-postgresql',
    };
    const envVars = merge(defaultEnvVars, props.envVars ?? {});

    const deployment = new MetaflowDeployment(this, 'metaflow-service-deployment', {
      namespaceName: props.namespaceName,
      container: {
        name: 'metaflow-ui',
        image: `${props.image}:${props.imageTag}`,
        command: ['/opt/latest/bin/python3', '-m', 'services.ui_backend_service.ui_server'],
        imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
        port: 8083,
        liveness: Probe.fromHttpGet('/api/ping', {
          initialDelaySeconds: Duration.seconds(30),
          periodSeconds: Duration.seconds(15),
        }),
        readiness: Probe.fromHttpGet('/api/ping', {
          initialDelaySeconds: Duration.seconds(30),
          periodSeconds: Duration.seconds(15),
        }),
      },
      envVars: envVars,
    });

    this.deployment = deployment.deployment;

    this.service = new Service(this, 'metaflow-ui-service', {
      type: props.serviceType,
      ports: [
        {
          port: 8083,
          name: 'http',
          protocol: Protocol.TCP,
        },
      ],
    });
    this.service.addDeployment(this.deployment);
  }
}

export class MetaflowUIStaticChart extends Chart {
  public readonly deployment: Deployment;
  public readonly service: Service;

  constructor(scope: Construct, name: string, props: MetaflowChartProps) {
    super(scope, name);
    const deployment = new MetaflowDeployment(this, 'metaflow-static-deployment', {
      namespaceName: props.namespaceName,
      container: {
        name: 'metaflow-ui-static',
        image: `${props.image}:${props.imageTag}`,
        imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
        port: 3000,
        liveness: Probe.fromHttpGet('/', {
          initialDelaySeconds: Duration.seconds(30),
          periodSeconds: Duration.seconds(15),
        }),
        readiness: Probe.fromHttpGet('/', {
          initialDelaySeconds: Duration.seconds(30),
          periodSeconds: Duration.seconds(15),
        }),
      },
    });

    this.deployment = deployment.deployment;
    this.service = new Service(this, 'metaflow-static-service', {
      type: props.serviceType,
      ports: [
        {
          port: 3000,
          name: 'http',
          protocol: Protocol.TCP,
        },
      ],
    });
  }
}
