import { ConfigMap, Container, ContainerProps, Deployment, EnvValue, IServiceAccount } from 'cdk8s-plus-21';
import { Construct } from 'constructs';

export interface MetaflowDeploymentProps {
  readonly namespace: string;
  readonly serviceAccount?: IServiceAccount;
  readonly container: ContainerProps;
  readonly initContainer?: ContainerProps;
  readonly envVars?: Record<string, string>;
}

export class MetaflowDeployment extends Construct {
  readonly deployment: Deployment;
  readonly namespace: string;

  constructor(scope: Construct, id: string, props: MetaflowDeploymentProps) {
    super(scope, id);

    this.namespace = props.namespace || 'default';
    const serviceAccount = props.serviceAccount || undefined;

    this.deployment = new Deployment(this, 'metaflow-deployment', {
      serviceAccount: serviceAccount,
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

  addEnvironmentVariables(id: string, container: Container, envVar: Record<string, string>) {
    const configMap = new ConfigMap(this, id, {
      metadata: {
        name: id,
        namespace: this.namespace,
      },
      data: envVar,
    });

    for (const key in envVar) {
      container.env.addVariable(key, EnvValue.fromConfigMap(configMap, key));
    }
  }
}
