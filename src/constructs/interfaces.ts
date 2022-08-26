import { ChartProps } from 'cdk8s';
import { IServiceAccount, ServicePort } from 'cdk8s-plus-21';

// TODO: make service accounts work with EKS - need to pass SA created by cdk eks and make it work with cdk8s
export interface MetaflowChartProps extends ChartProps {
  readonly serviceAccount?: IServiceAccount;
  readonly image: string;
  readonly imageTag: string;
  readonly initImage?: string;
  readonly initImageTag?: string;
  readonly servicePort: ServicePort;
  readonly envVars?: Record<string, string>;
}
