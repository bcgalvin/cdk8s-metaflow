import { Helm } from 'cdk8s';
import { Construct } from 'constructs';
import { MetaflowServiceOptions } from './interfaces';

export interface MetaflowServiceProps {
  readonly chartVersion: string;
  readonly chartValues?: MetaflowServiceOptions;
}

export class MetaflowService extends Construct {
  constructor(scope: Construct, id: string, props: MetaflowServiceProps) {
    super(scope, id);

    const chartValues = props.chartValues ?? {};

    new Helm(this, 'metaflow-service-helm', {
      chart: 'metaflow/metaflow-service',
      releaseName: 'release-name-metaflow-service',
      helmFlags: ['--version', props.chartVersion],
      values: { ...chartValues },
    });
  }
}
