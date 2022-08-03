import { Helm } from 'cdk8s';
import { Construct } from 'constructs';

export interface MetadataDatabaseProps {
  readonly serviceAccountName: string;
  readonly chartVersion: string;
  readonly databaseName?: string;
  readonly databaseUser?: string;
  readonly databasePassword?: string;
}

export class MetadataDatabase extends Construct {
  constructor(scope: Construct, id: string, props: MetadataDatabaseProps) {
    super(scope, id);

    new Helm(this, 'postgres', {
      chart: 'bitnami/postgresql',
      releaseName: 'release-name-postgresql',
      helmFlags: ['--version', props.chartVersion],
      values: {
        enabled: true,
        serviceAccount: {
          name: props?.serviceAccountName,
        },
        auth: {
          database: props?.databaseName ?? 'metaflow',
          username: props?.databaseUser ?? 'metaflow',
          password: props?.databasePassword ?? 'metaflow',
        },
      },
    });
  }
}
