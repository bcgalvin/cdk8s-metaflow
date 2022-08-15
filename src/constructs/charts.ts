import { Chart, ChartProps, Duration } from 'cdk8s';
import {
  Deployment as kplusDeployment,
  ImagePullPolicy,
  Probe,
  Protocol,
  Service,
  ServiceAccount,
  ServiceType,
} from 'cdk8s-plus-22';
import { Construct } from 'constructs';
import { Deployment } from './deployment';

export interface MetaflowChartProps extends ChartProps {
  readonly serviceAccount: ServiceAccount;
  readonly serviceType: ServiceType;
  readonly image: string;
  readonly imageTag: string;
  readonly initImage?: string;
  readonly initImageTag?: string;
  readonly envVars?: Record<string, string>;
}

export class MetaflowServiceChart extends Chart {
  public readonly deployment: kplusDeployment;
  public readonly service: Service;

  constructor(scope: Construct, name: string, props: MetaflowChartProps) {
    super(scope, name);
    const namespace = props.namespace || 'default';
    const envVars = props.envVars || {
      MF_METADATA_DB_NAME: 'metaflow',
      MF_METADATA_DB_PORT: '5432',
      MF_METADATA_DB_PSWD: 'metaflow',
      MF_METADATA_DB_USER: 'metaflow',
      MF_METADATA_DB_HOST: 'release-name-postgresql',
    };
    const deployment = new Deployment(this, 'metaflow-service', {
      namespaceName: namespace,
      serviceAccount: props.serviceAccount,
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
    this.service = this.deployment.exposeViaService({
      serviceType: props.serviceType,
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
  }
}

export class MetaflowUIChart extends Chart {
  public readonly deployment: kplusDeployment;
  public readonly service: Service;

  constructor(scope: Construct, name: string, props: MetaflowChartProps) {
    super(scope, name);
    const namespace = props.namespace || 'default';
    const envVars = props.envVars || {
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
    const deployment = new Deployment(this, 'metaflow-service', {
      namespaceName: namespace,
      serviceAccount: props.serviceAccount,
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
    this.service = this.deployment.exposeViaService({
      serviceType: props.serviceType,
      ports: [
        {
          port: 8083,
          name: 'http',
          protocol: Protocol.TCP,
        },
      ],
    });
  }
}

export class MetaflowUIStaticChart extends Chart {
  public readonly deployment: kplusDeployment;
  public readonly service: Service;

  constructor(scope: Construct, name: string, props: MetaflowChartProps) {
    super(scope, name);
    const namespace = props.namespace || 'default';
    const deployment = new Deployment(this, 'metaflow-service', {
      namespaceName: namespace,
      serviceAccount: props.serviceAccount,
      container: {
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
    this.service = this.deployment.exposeViaService({
      serviceType: props.serviceType,
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
