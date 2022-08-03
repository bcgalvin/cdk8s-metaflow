import { Helm } from 'cdk8s';
import { Construct } from 'constructs';

export interface MetaflowUIProps {
  readonly chartVersion: string;
}

export class MetaflowUI extends Construct {
  constructor(scope: Construct, id: string, props: MetaflowUIProps) {
    super(scope, id);

    new Helm(this, 'metaflow-ui-helm', {
      chart: 'metaflow/metaflow-ui',
      releaseName: 'release-name-metaflow-ui',
      helmFlags: ['--version', props.chartVersion],
    });
  }
}
