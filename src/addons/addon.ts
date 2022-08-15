import { Helm } from 'cdk8s';
import { Construct } from 'constructs';

export interface IAddon {
  readonly name: string;

  install(scope: Construct): Helm;
}
