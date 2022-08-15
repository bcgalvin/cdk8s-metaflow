import * as kplus from 'cdk8s-plus-22';
import { Construct } from 'constructs';

export interface DeploymentOptions {
  /**
   * Namespace to deploy resources to
   *
   * @default - default
   */
  readonly namespaceName: string;

  /**
   * Name of the serviceAccount used for this deployment
   *
   * @default - default
   */
  readonly serviceAccount: kplus.ServiceAccount;

  /**
   * Number of the replicas
   *
   * @default 1
   */
  readonly replicas?: number;

  /**
   * Container props
   */
  readonly container: kplus.ContainerProps;

  /**
   * Init Container props
   */
  readonly initContainer?: kplus.ContainerProps;

  /**
   * Environment Variables
   *
   */
  readonly envVars?: Record<string, string>;
}

export class Deployment extends Construct {
  deployment: kplus.Deployment;
  namespace: string;

  constructor(scope: Construct, id: string, props: DeploymentOptions) {
    super(scope, id);

    this.namespace = props.namespaceName || 'default';

    this.deployment = new kplus.Deployment(this, 'deployment', {
      metadata: {
        namespace: this.namespace,
      },
      replicas: props.replicas || 1,
      containers: [props.container],
      initContainers: props.initContainer ? [props.initContainer] : undefined,
      serviceAccount: props.serviceAccount,
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
