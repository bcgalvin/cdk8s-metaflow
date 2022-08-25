import * as kplus from 'cdk8s-plus-21';
import { ContainerProps } from 'cdk8s-plus-21';
import { Construct } from 'constructs';

export interface MetaflowDeploymentProps {
  readonly namespaceName: string;
  readonly serviceAccountName?: string;
  readonly container: ContainerProps;
  readonly initContainer?: ContainerProps;
  readonly envVars?: Record<string, string>;
}

export interface ServiceAccount {
  readonly create: boolean;
  readonly name?: string;
}

export class MetaflowDeployment extends Construct {
  deployment: kplus.Deployment;
  namespace: string;

  constructor(scope: Construct, id: string, props: MetaflowDeploymentProps) {
    super(scope, id);

    this.namespace = props.namespaceName || 'default';

    this.deployment = new kplus.Deployment(this, 'deployment', {
      metadata: {
        namespace: this.namespace,
      },
      containers: [props.container],
      initContainers: props.initContainer ? [props.initContainer] : undefined,
    });

    if (props.envVars) {
      this.addEnvironmentVariables('container-env', this.deployment.containers[0], props.envVars);
    }
    if (props.initContainer && props.envVars) {
      this.addEnvironmentVariables('init-container-env', this.deployment.initContainers[0], props.envVars);
    }
  }

  addEnvironmentVariables(id: string, container: kplus.Container, envVar: Record<string, string>) {
    const configMap = new kplus.ConfigMap(this, id, {
      metadata: {
        name: id,
        namespace: this.namespace,
      },
      data: envVar,
    });

    for (const key in envVar) {
      container.env.addVariable(key, kplus.EnvValue.fromConfigMap(configMap, key));
    }
  }
}
