import { Helm } from 'cdk8s';
import { Construct } from 'constructs';
import merge from 'ts-deepmerge';
import { IAddon } from '../addon';

export interface DatabaseAuthOptions {
  readonly database?: string;
  readonly password?: string;
  readonly username?: string;
  readonly postgresPassword?: string;
  readonly enablePostgresUser?: boolean;
  readonly replicationPassword?: string;
  readonly replicationUsername?: string;
}

export interface DatabaseMetricsOptions {
  readonly enabled?: boolean;
}

export interface DatabaseResourceRequestOptions {
  readonly memory?: string;
  readonly cpu?: string;
}

export interface DatabaseResourcesOptions {
  readonly requests?: DatabaseResourceRequestOptions;
}

export interface DatabaseReplicationOptions {
  readonly enabled?: boolean;
  readonly readReplicas?: number;
}

export interface DatabaseVolumePermissionsOptions {
  readonly enabled?: boolean;
}

export interface MetadataDatabaseOptions {
  readonly auth?: DatabaseAuthOptions;
  readonly metrics?: DatabaseMetricsOptions;
  readonly resources?: DatabaseResourcesOptions;
  readonly replication?: DatabaseReplicationOptions;
  readonly architecture?: string;
  readonly volumePermissions?: DatabaseVolumePermissionsOptions;
}

export interface HelmPostgresAddonProps {
  readonly chartVersion: string;
  readonly chartValues?: MetadataDatabaseOptions;
  readonly namespaceName: string;
}

export class HelmPostgresAddon implements IAddon {
  public static readonly NAME = 'helm-postgres';

  constructor(private readonly props: HelmPostgresAddonProps) {}

  public get name(): string {
    return HelmPostgresAddon.NAME;
  }

  public install(scope: Construct): Construct {
    const defaultChartValues = {
      auth: {
        database: 'metaflow',
        password: 'metaflow',
        username: 'metaflow',
      },
    };
    const chartValues = merge(defaultChartValues, this.props.chartValues ?? {});

    new Helm(scope, 'postgres', {
      chart: 'bitnami/postgresql',
      releaseName: 'release-name-postgresql',
      helmFlags: ['--version', this.props.chartVersion, '-n', this.props.namespaceName],
      values: chartValues,
    });

    return scope;
  }
}
