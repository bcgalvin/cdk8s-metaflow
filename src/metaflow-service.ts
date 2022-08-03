import { Helm } from 'cdk8s';
import { Construct } from 'constructs';

export interface MetaflowServiceProps {
  readonly chartVersion: string;
}

export class MetaflowService extends Construct {
  constructor(scope: Construct, id: string, props: MetaflowServiceProps) {
    super(scope, id);

    new Helm(this, 'metaflow-service-helm', {
      chart: 'metaflow/metaflow-service',
      releaseName: 'release-name-metaflow-service',
      helmFlags: ['--version', props.chartVersion],
    });
  }
}
