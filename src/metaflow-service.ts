import * as kplus from 'cdk8s-plus-22';
import { LabelSelector, Protocol } from 'cdk8s-plus-22';
import { Construct } from 'constructs';
import { KubeServiceAccount } from './imports/k8s';

export interface MetaflowServiceProps {
  readonly serviceAccountName?: string;
  readonly serviceName?: string;
  readonly image?: string;
  readonly metadataServicePort?: number;
  readonly upgradesServicePort?: number;
}

export class MetaflowService extends Construct {
  constructor(scope: Construct, id: string, props?: MetaflowServiceProps) {
    super(scope, id);

    const serviceAccountName = props?.serviceAccountName || 'release-name-metaflow-service';
    const serviceName = props?.serviceName || 'metaflow-service';
    const image = props?.image || 'public.ecr.aws/outerbounds/metaflow_metadata_service:2.2.4';
    const metadataServicePort = props?.metadataServicePort || 8080;
    const upgradesServicePort = props?.upgradesServicePort || 8082;

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
      selector: kplus.Pods.select(this, 'Selected', {
        labels: {
          'app.kubernetes.io/name': serviceName,
          'app.kubernetes.io/instance': 'release-name',
        },
      }),
    });

    const deployment = new kplus.Deployment(this, 'metaflow-deployment', {
      replicas: 1,
      initContainers: [
        {
          name: 'db-migrations',
          image: image,
          command: ['/opt/latest/bin/python3', '/root/run_goose.py', '--only-if-empty-db'],
          envVariables: {
            MF_METADATA_DB_NAME: kplus.EnvValue.fromValue(''),
            MF_METADATA_DB_PORT: kplus.EnvValue.fromValue('5432'),
            MF_METADATA_DB_PSWD: kplus.EnvValue.fromValue(''),
            MF_METADATA_DB_USER: kplus.EnvValue.fromValue(''),
            MF_METADATA_DB_HOST: kplus.EnvValue.fromValue('release-name-postgresql'),
          },
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
          envVariables: {
            MF_METADATA_DB_NAME: kplus.EnvValue.fromValue(''),
            MF_METADATA_DB_PORT: kplus.EnvValue.fromValue('5432'),
            MF_METADATA_DB_PSWD: kplus.EnvValue.fromValue(''),
            MF_METADATA_DB_USER: kplus.EnvValue.fromValue(''),
            MF_METADATA_DB_HOST: kplus.EnvValue.fromValue('release-name-postgresql'),
          },
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

    deployment.select(
      LabelSelector.of({
        labels: {
          'app.kubernetes.io/name': 'metaflow-service',
          'app.kubernetes.io/instance': 'release-name',
        },
      }),
    );
  }
}
