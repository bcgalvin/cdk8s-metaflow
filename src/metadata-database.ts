import { Helm } from 'cdk8s';
import { Construct } from 'constructs';
import { MetadataDatabaseOptions } from './interfaces';

export interface MetadataDatabaseProps {
  readonly chartVersion: string;
  readonly chartValues?: MetadataDatabaseOptions;
}

export class MetadataDatabase extends Construct {
  constructor(scope: Construct, id: string, props: MetadataDatabaseProps) {
    super(scope, id);

    const chartValues = props.chartValues ?? {
      enabled: true,
      auth: {
        database: 'metaflow',
        password: 'metaflow',
        username: 'metaflow',
      },
    };

    new Helm(this, 'postgres', {
      chart: 'bitnami/postgresql',
      releaseName: 'release-name-postgresql',
      helmFlags: ['--version', props.chartVersion],
      values: chartValues,
    });
  }
}
