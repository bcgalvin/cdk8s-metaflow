import { Helm } from 'cdk8s';
import { Construct } from 'constructs';
import { MetaflowUIOptions } from './interfaces';

export interface MetaflowUIProps {
  readonly chartVersion: string;
  readonly chartValues?: MetaflowUIOptions;
}

export class MetaflowUI extends Construct {
  constructor(scope: Construct, id: string, props: MetaflowUIProps) {
    super(scope, id);

    const chartValues = props.chartValues ?? {};

    new Helm(this, 'metaflow-ui-helm', {
      chart: 'metaflow/metaflow-ui',
      releaseName: 'release-name-metaflow-ui',
      helmFlags: ['--version', props.chartVersion],
      values: chartValues,
    });
  }
}
