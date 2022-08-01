import * as kplus from 'cdk8s-plus-22';
import { Protocol } from 'cdk8s-plus-22';
import { Construct } from 'constructs';
import { KubeServiceAccount } from './imports/k8s';

export interface MetaflowServiceProps {
  readonly serviceAccountName?: string;
  readonly metadataServicePort?: number;
  readonly upgradesServicePort?: number;
}

export class MetaflowService extends Construct {
  constructor(scope: Construct, id: string, props?: MetaflowServiceProps) {
    super(scope, id);

    const metadataServicePort = props?.metadataServicePort || 8080;
    const upgradesServicePort = props?.upgradesServicePort || 8082;
    const serviceAccountName = props?.serviceAccountName || 'release-name-metaflow-service';

    new KubeServiceAccount(this, 'metaflow-sa', {
      metadata: {
        name: serviceAccountName,
        labels: {
          'helm.sh/chart': 'metaflow-service-0.2.0',
          'app.kubernetes.io/name': 'metaflow-service',
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
          'app.kubernetes.io/name': 'metaflow-service',
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
  }
}
