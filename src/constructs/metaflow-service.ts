import { Chart, Duration } from 'cdk8s';
import { ImagePullPolicy, IServiceAccount, Probe } from 'cdk8s-plus-21';
import { Construct } from 'constructs';
import merge from 'ts-deepmerge';
import { MetaflowDeployment } from './deployment';
import { MetaflowChartProps } from './interfaces';

export class MetaflowService extends Chart {
  public readonly serviceAccount: IServiceAccount | undefined;

  constructor(scope: Construct, name: string, props: MetaflowChartProps) {
    super(scope, name);

    const defaultEnvVars = {
      MF_METADATA_DB_NAME: 'metaflow',
      MF_METADATA_DB_PORT: '5432',
      MF_METADATA_DB_PSWD: 'metaflow',
      MF_METADATA_DB_USER: 'metaflow',
      MF_METADATA_DB_HOST: 'release-name-postgresql',
    };

    const envVars = merge(defaultEnvVars, props.envVars ?? {});
    this.serviceAccount = props.serviceAccount || undefined;

    const apiObject = new MetaflowDeployment(this, 'metaflow-service-deployment', {
      namespace: props.namespace!,
      serviceAccount: this.serviceAccount,
      initContainer: {
        name: 'migrate',
        port: 8082,
        image: `${props.initImage}:${props.initImageTag}`,
        command: ['/opt/latest/bin/python3', '/root/run_goose.py', '--only-if-empty-db'],
        imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
      },
      container: {
        name: 'metaflow-service',
        port: 8080,
        image: `${props.image}:${props.imageTag}`,
        command: ['/opt/latest/bin/python3', '-m', 'services.metadata_service.server'],
        imagePullPolicy: ImagePullPolicy.IF_NOT_PRESENT,
        liveness: Probe.fromHttpGet('/ping', {
          initialDelaySeconds: Duration.seconds(30),
          periodSeconds: Duration.seconds(15),
        }),
        readiness: Probe.fromHttpGet('/ping', {
          initialDelaySeconds: Duration.seconds(30),
          periodSeconds: Duration.seconds(15),
        }),
      },
      envVars: envVars,
    });

    apiObject.deployment.exposeViaService({ ...props.servicePort });
  }
}
