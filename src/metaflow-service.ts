import { Helm } from 'cdk8s';
import * as kplus from 'cdk8s-plus-22';
import { Protocol } from 'cdk8s-plus-22';
import { Construct } from 'constructs';
import { KubeServiceAccount } from './imports/k8s';

export interface PostgresOptions {
  databaseName?: string;
  databaseUser?: string;
  databasePassword?: string;
}

export interface MetaflowServiceProps {
  readonly serviceAccountName?: string;
  readonly serviceName?: string;
  readonly image?: string;
  readonly metadataServicePort?: number;
  readonly upgradesServicePort?: number;
  readonly ingressEnabled?: boolean;
  readonly postgresEnabled?: boolean;
  readonly postgresOptions?: PostgresOptions;
}

export class MetaflowService extends Construct {
  constructor(scope: Construct, id: string, props?: MetaflowServiceProps) {
    super(scope, id);

    const serviceAccountName = props?.serviceAccountName || 'release-name-metaflow-service';
    const serviceName = props?.serviceName || 'metaflow-service';
    const image = props?.image || 'public.ecr.aws/outerbounds/metaflow_metadata_service:2.2.4';
    const metadataServicePort = props?.metadataServicePort || 8080;
    const upgradesServicePort = props?.upgradesServicePort || 8082;

    const dbEnvVals: { [p: string]: kplus.EnvValue } = {
      MF_METADATA_DB_NAME: kplus.EnvValue.fromValue(props?.postgresOptions?.databaseName || 'metaflow'),
      MF_METADATA_DB_USER: kplus.EnvValue.fromValue(props?.postgresOptions?.databaseUser || 'metaflow'),
      MF_METADATA_DB_PSWD: kplus.EnvValue.fromValue(props?.postgresOptions?.databasePassword || 'metaflow'),
      MF_METADATA_DB_PORT: kplus.EnvValue.fromValue('5432'),
      MF_METADATA_DB_HOST: kplus.EnvValue.fromValue('release-name-postgresql'),
    };

    const serviceAccount = new KubeServiceAccount(this, 'metaflow-sa', {
      metadata: {
        name: serviceAccountName,
        labels: {
          'helm.sh/chart': 'metaflow-service-0.2.0',
          'app.kubernetes.io/name': serviceName,
          'app.kubernetes.io/instance': 'release-name',
          'app.kubernetes.io/version': '2.2.4',
          'app.kubernetes.io/managed-by': 'Helm',
        },
      },
    });

    new kplus.Service(this, 'metaflow-service', {
      metadata: {
        name: serviceAccountName,
        labels: {
          'helm.sh/chart': 'metaflow-service-0.2.0',
          'app.kubernetes.io/name': serviceName,
          'app.kubernetes.io/instance': 'release-name',
          'app.kubernetes.io/version': '2.2.4',
          'app.kubernetes.io/managed-by': 'Helm',
        },
      },
      type: kplus.ServiceType.CLUSTER_IP,
      ports: [
        {
          name: 'metadata',
          port: metadataServicePort,
          protocol: Protocol.TCP,
          targetPort: metadataServicePort,
        },
        {
          name: 'upgrades',
          port: upgradesServicePort,
          protocol: Protocol.TCP,
          targetPort: upgradesServicePort,
        },
      ],
    });

    if (props?.postgresEnabled) {
      new Helm(this, 'postgres', {
        chart: 'bitnami/postgresql',
        releaseName: 'release-name-postgresql',
        values: {
          enabled: true,
          postgresqlDatabase: props?.postgresOptions?.databaseName || 'metaflow',
          postgresqlUsername: props?.postgresOptions?.databaseUser || 'metaflow',
          postgresqlPassword: props?.postgresOptions?.databasePassword || 'metaflow',
        },
      });
    }

    new kplus.Deployment(this, 'metaflow-deployment', {
      replicas: 1,
      initContainers: [
        {
          name: 'db-migrations',
          image: image,
          command: ['/opt/latest/bin/python3', '/root/run_goose.py', '--only-if-empty-db'],
          envVariables: dbEnvVals,
        },
      ],
      containers: [
        {
          name: 'metaflow-service',
          image: image,
          command: ['/opt/latest/bin/python3', '-m', 'services.metadata_service.server'],
          imagePullPolicy: kplus.ImagePullPolicy.IF_NOT_PRESENT,
          liveness: kplus.Probe.fromHttpGet('/ping', { port: metadataServicePort }),
          readiness: kplus.Probe.fromHttpGet('/ping', { port: metadataServicePort }),
          port: metadataServicePort,
          envVariables: dbEnvVals,
        },
      ],
      metadata: {
        name: serviceAccountName,
        labels: {
          'helm.sh/chart': 'metaflow-service-0.2.0',
          'app.kubernetes.io/name': serviceName,
          'app.kubernetes.io/instance': 'release-name',
          'app.kubernetes.io/version': '2.2.4',
          'app.kubernetes.io/managed-by': 'Helm',
        },
      },
      serviceAccount,
    });

    new kplus.Pod(this, 'metaflow-service-pod', {
      metadata: {
        name: 'release-name-metaflow-service-test-connection',
        labels: {
          'helm.sh/chart': 'metaflow-service-0.2.0',
          'app.kubernetes.io/name': serviceName,
          'app.kubernetes.io/instance': 'release-name',
          'app.kubernetes.io/version': '2.2.4',
          'app.kubernetes.io/managed-by': 'Helm',
        },
        annotations: { 'helm.sh/hook': 'test' },
      },
      containers: [
        {
          name: 'wget',
          image: 'busybox',
          command: ['wget'],
          args: ['release-name-metaflow-service:8080'],
        },
      ],
      restartPolicy: kplus.RestartPolicy.NEVER,
    });
  }
}
