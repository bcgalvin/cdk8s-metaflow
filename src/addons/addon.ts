import { Construct } from 'constructs';

export interface IAddon {
  readonly name: string;

  install(scope: Construct): Construct;
}
