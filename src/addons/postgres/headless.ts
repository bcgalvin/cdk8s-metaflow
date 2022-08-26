import { Protocol, Service } from 'cdk8s-plus-21';
import { Construct } from 'constructs';
import { Endpoints } from '../../imports/k8s';
import { IAddon } from '../addon';

export interface LocalPostgresAddonProps {
  readonly endpointIp: string;
  readonly namespaceName?: string;
}

export class LocalPostgresAddon implements IAddon {
  public static readonly NAME = 'postgres';

  constructor(private readonly props: LocalPostgresAddonProps) {}

  public get name(): string {
    return LocalPostgresAddon.NAME;
  }

  public install(scope: Construct): Construct {
    const namespace = this.props.namespaceName ?? 'default';

    const service = new Service(scope, 'postgres-service', {
      metadata: {
        namespace: namespace,
        name: 'release-name-postgresql',
      },
      ports: [
        {
          port: 5432,
          targetPort: 5432,
          protocol: Protocol.TCP,
        },
      ],
      clusterIP: 'None',
    });

    new Endpoints(scope, 'postgres-local-endpoints', {
      metadata: {
        name: service.name,
        namespace: namespace,
      },
      subsets: [
        {
          addresses: [
            {
              ip: this.props.endpointIp,
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
    return scope;
  }
}
