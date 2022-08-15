import { Helm } from 'cdk8s';
import { HttpIngressPathType, ImagePullPolicy, IngressTls, ServiceType } from 'cdk8s-plus-22';
import { Construct } from 'constructs';
import * as k8s from '../../imports/k8s';
import { IAddon } from '../addon';
import { HelmObject } from '../common';

export interface ArgoImagesOptions {
  readonly tag?: string;
  readonly pullPolicy?: ImagePullPolicy;
  readonly pullSecrets?: string[];
}

export interface ArgoImageOptions {
  readonly registry?: string;
  readonly repository?: string;
  readonly tag?: string;
}

export interface ArgoServiceAccountOptions {
  readonly create?: boolean;
  readonly annotations?: HelmObject;
  readonly name?: string;
}

export interface ArgoRbacOptions {
  readonly create?: boolean;
}

export interface WorkflowOptions {
  readonly namespace?: string;
  readonly serviceAccount?: ArgoServiceAccountOptions;
  readonly rbac?: ArgoRbacOptions;
}

export interface MetricsConfigOptions {
  readonly enabled?: boolean;
  readonly path?: string;
  readonly port?: number;
  readonly portName?: string;
  readonly servicePort?: number;
  readonly servicePortName?: string;
}

export interface SecurityContextCapabilitiesOptions {
  readonly drop?: string[];
}

export interface SecurityContextOptions {
  readonly readOnlyRootFilesystem?: boolean;
  readonly runAsNonRoot?: boolean;
  readonly allowPrivilegeEscalation?: boolean;
  readonly capabilities?: SecurityContextCapabilitiesOptions;
}

export interface TelemetryOptions {
  readonly enabled?: boolean;
  readonly path?: string;
  readonly port?: number;
  readonly servicePort?: number;
  readonly servicePortName?: string;
}

export interface ArgoServiceMonitorOptions {
  readonly enabled?: boolean;
  readonly additionalLabels?: HelmObject;
  readonly namespace?: string;
}

export interface InstanceIDOptions {
  readonly enabled?: boolean;
  readonly useReleaseName?: boolean;
  readonly explicitID?: string;
}

export interface LoggingOptions {
  readonly level?: string;
  readonly globallevel?: string;
}

export interface HttpGetOptions {
  readonly port?: number;
  readonly path?: string;
}

export interface LivenessProbeOptions {
  readonly httpGet?: HttpGetOptions;
  readonly failureThreshold?: number;
  readonly initialDelaySeconds?: number;
  readonly periodSeconds?: number;
  readonly timeoutSeconds?: number;
}

export interface EnabledOptions {
  readonly enabled?: boolean;
}

export interface ContainerOptions {
  readonly imagePullPolicy?: ImagePullPolicy;
  readonly resources?: HelmObject;
  readonly env?: HelmObject;
  readonly securityContext?: HelmObject;
}

export interface ControllerOptions {
  readonly image?: ArgoImageOptions;
  readonly parallelism?: number;
  readonly resourceRateLimit?: HelmObject;
  readonly rbac?: ArgoRbacOptions;
  readonly namespaceParallelism?: string;
  readonly initialDelay?: string;
  readonly deploymentAnnotations?: HelmObject;
  readonly podAnnotations?: HelmObject;
  readonly podLabels?: HelmObject;
  readonly podSecurityContext?: k8s.PodSecurityContext;
  readonly metricsConfig?: MetricsConfigOptions;
  readonly securityContext?: SecurityContextOptions;
  readonly persistence?: HelmObject;
  readonly workflowDefaults?: HelmObject;
  readonly workflowWorkers?: string;
  readonly workflowRestrictions?: HelmObject;
  readonly telemetryConfig?: TelemetryOptions;
  readonly serviceMonitor?: ArgoServiceMonitorOptions;
  readonly serviceAccount?: ArgoServiceAccountOptions;
  readonly name?: string;
  readonly workflowNamespaces?: string[];
  readonly containerRuntimeExecutor?: string;
  readonly containerRuntimeExecutors?: string[];
  readonly instanceID?: InstanceIDOptions;
  readonly logging?: LoggingOptions;
  readonly serviceType?: ServiceType;
  readonly serviceAnnotations?: HelmObject;
  readonly serviceLabels?: HelmObject;
  readonly loadBalancerSourceRanges?: string[];
  readonly resources?: HelmObject;
  readonly livenessProbe?: LivenessProbeOptions;
  readonly extraEnv?: k8s.EnvVar[];
  readonly extraArgs?: string[];
  readonly volumeMounts?: k8s.VolumeMount[];
  readonly volumes?: k8s.Volume[];
  readonly replicas?: number;
  readonly pdb?: EnabledOptions;
  readonly nodeSelector?: HelmObject;
  readonly tolerations?: k8s.Toleration[];
  readonly affinity?: k8s.Affinity;
  readonly priorityClassName?: string;
  readonly links?: string[];
  readonly navColor?: string;
  readonly clusterWorkflowTemplates?: EnabledOptions;
  readonly extraContainers?: k8s.Container[];
}

export interface WorkflowOptions {
  readonly namespace?: string;
  readonly serviceAccount?: ArgoServiceAccountOptions;
  readonly rbac?: ArgoRbacOptions;
}

export interface ExecutorOptions {
  readonly image?: ArgoImageOptions;
  readonly resources?: HelmObject;
  readonly env?: HelmObject;
  readonly securityContext?: HelmObject;
}

export interface IngressOptions {
  readonly enabled?: boolean;
  readonly annotations?: HelmObject;
  readonly labels?: HelmObject;
  readonly ingressClassName?: string;
  readonly hosts: string[];
  readonly paths?: string[];
  readonly pathType?: HttpIngressPathType;
  readonly extraPaths?: string[];
  readonly tls?: IngressTls;
}

export interface ClusterWorkflowTemplatesOptions {
  readonly enabled?: boolean;
  readonly enableEditing?: boolean;
}

export interface ServerOptions {
  readonly enabled?: boolean;
  readonly baseHref?: string;
  readonly image?: ArgoImageOptions;
  readonly deploymentAnnotations?: HelmObject;
  readonly podAnnotations?: HelmObject;
  readonly podLabels?: HelmObject;
  readonly podSecurityContext?: k8s.PodSecurityContext;
  readonly rbac?: EnabledOptions;
  readonly securityContext?: SecurityContextOptions;
  readonly name?: string;
  readonly serviceType?: ServiceType;
  readonly servicePort?: number;
  readonly serviceNodePort?: number;
  readonly servicePortName?: string;
  readonly serviceAccount?: ArgoServiceAccountOptions;
  readonly serviceAnnotations?: HelmObject;
  readonly serviceLabels?: HelmObject;
  readonly loadBalancerIP?: string;
  readonly loadBalancerSourceRanges?: string[];
  readonly resources?: HelmObject;
  readonly replicas?: number;
  readonly pdb?: EnabledOptions;
  readonly nodeSelector?: HelmObject;
  readonly tolerations?: k8s.Toleration[];
  readonly affinity?: k8s.Affinity;
  readonly priorityClassName?: string;
  readonly secure?: boolean;
  readonly extraEnv?: k8s.EnvVar[];
  readonly extraArgs?: string[];
  readonly volumeMounts?: k8s.VolumeMount[];
  readonly volumes?: k8s.Volume[];
  readonly ingress?: IngressOptions;
  readonly clusterWorkflowTemplates?: ClusterWorkflowTemplatesOptions;
  readonly sso?: HelmObject;
  readonly extraContainers?: k8s.Container[];
}

export interface KeyOptions {
  readonly key?: string;
}

export interface EncryptionOptions {
  readonly enableEncryption?: boolean;
}

export interface S3Options {
  readonly accessKeySecret?: KeyOptions;
  readonly secretKeySecret?: KeyOptions;
  readonly keyFormat?: string;
  readonly insecure?: boolean;
  readonly bucket: string;
  readonly endpoint: string;
  readonly region: string;
  readonly roleArn?: string;
  readonly useSDKCreds?: boolean;
  readonly encryptionOptions?: EncryptionOptions;
}

export interface ArtifactRepositoryOptions {
  readonly archiveLogs?: boolean;
  readonly s3: S3Options;
  readonly gcs?: HelmObject;
}

export interface ArgoWorkflowsOptions {
  readonly image?: ArgoImagesOptions;
  readonly createAggregateRoles?: boolean;
  readonly nameOverride?: string;
  readonly fullnameOverride?: string;
  readonly kubeVersionOverride?: string;
  readonly singleNamespace?: boolean;
  readonly workflow?: WorkflowOptions;
  readonly controller?: ControllerOptions;
  readonly mainContainer?: ContainerOptions;
  readonly executor?: ExecutorOptions;
  readonly server?: ServerOptions;
  readonly useDefaultArtifactRepo?: boolean;
  readonly useStaticCredentials?: boolean;
  readonly artifactRepository: ArtifactRepositoryOptions;
}

export interface ArgoWorkflowsAddonProps {
  readonly chartVersion: string;
  readonly chartValues: ArgoWorkflowsOptions;
  readonly namespaceName: string;
}

export class ArgoWorkflowsAddon implements IAddon {
  public static readonly NAME = 'argo-workflows';

  constructor(private readonly props: ArgoWorkflowsAddonProps) {}

  public get name(): string {
    return ArgoWorkflowsAddon.NAME;
  }

  public install(scope: Construct): Helm {
    const defaultValues: ArgoWorkflowsOptions = {
      server: { extraArgs: ['--auth-mode=server'] },
      workflow: {
        serviceAccount: {
          create: true,
        },
      },
      controller: {
        containerRuntimeExecutor: 'emissary',
      },
      useDefaultArtifactRepo: true,
      useStaticCredentials: false,
      artifactRepository: {
        s3: {
          bucket: this.props.chartValues.artifactRepository.s3.bucket,
          endpoint: this.props.chartValues.artifactRepository.s3.endpoint,
          region: this.props.chartValues.artifactRepository.s3.region,
          useSDKCreds: true,
          insecure: false,
          keyFormat:
            'argo-artifacts/{{workflow.creationTimestamp.Y}}/{{workflow.creationTimestamp.m}}/{{workflow.creationTimestamp.d}}/{{workflow.name}}/{{pod.name}}',
        },
      },
    };

    const chartValues = { ...defaultValues, ...this.props.chartValues };

    const chart = new Helm(scope, 'argo-workflows', {
      chart: 'argo/argo-workflows',
      releaseName: 'argo',
      helmFlags: ['--version', this.props.chartVersion, '-n', this.props.namespaceName],
      values: chartValues,
    });

    return chart;
  }
}
