import { Helm } from 'cdk8s';
import { DnsPolicy, ImagePullPolicy, ServiceType } from 'cdk8s-plus-22';
import { Construct } from 'constructs';
import { Affinity, Toleration, TopologySpreadConstraint, Volume, VolumeMount } from '../../imports/k8s';
import { IAddon } from '../addon';
import { HelmObject } from '../common';

export interface AutoDiscoveryOptions {
  readonly clusterName: string;
  readonly tags?: string[];
  readonly roles?: string[];
  readonly labels?: HelmObject;
}

export interface DeploymentOptions {
  readonly annotations?: HelmObject;
}

export interface AutoScalerImageOptions {
  readonly repository?: string;
  readonly tag?: string;
  readonly pullPolicy?: ImagePullPolicy;
  readonly pullSecrets?: string[];
}

export interface ExtraArgsOptions {
  readonly logtostderr?: boolean;
  readonly stderrthreshold?: string;
  readonly v?: number;
}

export interface podDisruptionBudgetOptions {
  readonly maxUnavailable?: number;
}

export interface AutoScalerServiceAccountOptions {
  readonly annotations?: HelmObject;
  readonly create?: boolean;
  readonly name?: string;
  readonly automountServiceAccountToken?: boolean;
}

export interface AutoScalerRbacOptions {
  readonly create?: boolean;
  readonly pspEnabled?: boolean;
  readonly clusterScoped?: boolean;
  readonly serviceAccount?: AutoScalerServiceAccountOptions;
}

export interface ServiceOptions {
  readonly create?: boolean;
  readonly annotations?: HelmObject;
  readonly labels?: HelmObject;
  readonly externalIPs?: string[];
  readonly loadBalancerIP?: string;
  readonly loadBalancerSourceRanges?: string[];
  readonly servicePort?: number;
  readonly portName?: string;
  readonly type?: ServiceType;
}

export interface SelectorOptions {
  readonly release?: string;
}

export interface AutoScalerServiceMonitorOptions {
  readonly enabled?: boolean;
  readonly interval?: string;
  readonly namespace?: string;
  readonly selector?: SelectorOptions;
  readonly path?: string;
}

export interface PrometheusRuleOptions {
  readonly enabled?: boolean;
  readonly additionalLabels?: HelmObject;
  readonly namespace?: string;
  readonly interval?: string;
  readonly rules?: string[];
}

export interface AutoScalerOptions {
  readonly affinity?: Affinity;
  readonly autoDiscovery: AutoDiscoveryOptions;
  readonly autoscalingGroups?: string[];
  readonly autoscalingGroupsnamePrefix?: string[];
  readonly awsAccessKeyID?: string;
  readonly awsRegion: string;
  readonly awsSecretAccessKey?: string;
  readonly azureClientID?: string;
  readonly azureClientSecret?: string;
  readonly azureResourceGroup?: string;
  readonly azureSubscriptionID?: string;
  readonly azureTenantID?: string;
  readonly azureVMType?: string;
  readonly azureClusterName?: string;
  readonly azureNodeResourceGroup?: string;
  readonly azureUseManagedIdentityExtension?: boolean;
  readonly magnumClusterName?: string;
  readonly magnumCABundlePath?: string;
  readonly clusterAPIMode?: string;
  readonly clusterAPIKubeconfigSecret?: string;
  readonly clusterAPIWorkloadKubeconfigPath?: string;
  readonly clusterAPICloudConfigPath?: string;
  readonly clusterAPIConfigMapsNamespace?: string;
  readonly cloudConfigPath?: string;
  readonly cloudProvider?: string;
  readonly containerSecurityContext?: HelmObject;
  readonly deployment?: DeploymentOptions;
  readonly dnsPolicy?: DnsPolicy;
  readonly expanderPriorities?: HelmObject;
  readonly priorityConfigMapAnnotations?: HelmObject;
  readonly extraArgs?: ExtraArgsOptions;
  readonly extraEnv?: HelmObject;
  readonly extraEnvConfigMaps?: HelmObject;
  readonly extraEnvSecrets?: HelmObject;
  readonly envFromConfigMap?: string;
  readonly envFromSecret?: string;
  readonly extraVolumeSecrets?: HelmObject;
  readonly extraVolumes?: Volume[];
  readonly extraVolumeMounts?: VolumeMount[];
  readonly fullnameOverride?: string;
  readonly ImageOptions?: AutoScalerImageOptions;
  readonly kubeTargetVersionOverride?: string;
  readonly nameOverride?: string;
  readonly nodeSelector?: HelmObject;
  readonly podAnnotations?: HelmObject;
  readonly podDisruptionBudget?: podDisruptionBudgetOptions;
  readonly podLabels?: HelmObject;
  readonly additionalLabels?: HelmObject;
  readonly priorityClassName?: string;
  readonly rbac?: AutoScalerRbacOptions;
  readonly replicaCount?: number;
  readonly resources?: HelmObject;
  readonly securityContext?: HelmObject;
  readonly service?: ServiceOptions;
  readonly serviceMonitor?: AutoScalerServiceMonitorOptions;
  readonly prometheusRule?: PrometheusRuleOptions;
  readonly tolerations?: Toleration[];
  readonly topologySpreadConstraints?: TopologySpreadConstraint[];
  readonly updateStrategy?: HelmObject;
}

export interface AutoScalerAddonProps {
  readonly chartVersion: string;
  readonly chartValues: AutoScalerOptions;
  readonly namespaceName?: string;
}

export class AutoScalerAddon implements IAddon {
  public static readonly NAME = 'autoscaler';

  constructor(private readonly props: AutoScalerAddonProps) {}

  public get name(): string {
    return AutoScalerAddon.NAME;
  }

  public install(scope: Construct): Helm {
    const defaultValues: AutoScalerOptions = {
      autoDiscovery: {
        clusterName: this.props.chartValues.autoDiscovery.clusterName,
      },
      awsRegion: this.props.chartValues.awsRegion,
    };

    const chartValues = { ...defaultValues, ...this.props.chartValues };

    const chart = new Helm(scope, 'autoscaler', {
      chart: 'autoscaler/cluster-autoscaler',
      releaseName: 'autoscaler',
      helmFlags: ['--version', this.props.chartVersion, '-n', this.props.namespaceName || 'kube-system'],
      values: chartValues,
    });

    return chart;
  }
}
