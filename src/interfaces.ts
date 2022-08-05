import { HttpIngressPathType, ImagePullPolicy, ServiceType } from './enums';
import { Affinity, EnvFromSource, IngressTls, SecurityContext, Toleration } from './imports/k8s';

export interface ImageOptions {
  readonly repository?: string;
  readonly pullPolicy?: ImagePullPolicy;
  readonly tag?: string;
}

export interface ServiceAccountOptions {
  readonly create?: boolean | undefined;
  readonly annotations?: Record<string, string>;
  readonly name?: string;
}

export interface DbMigrationOptions {
  readonly runOnStart?: boolean;
  readonly onlyIfDbEmpty?: boolean;
}

export interface ServiceOptions {
  readonly type?: ServiceType;
  readonly port?: number;
  readonly annotations?: Record<string, string>;
}

export interface HttpIngressPath {
  readonly path?: string;
  readonly pathType?: HttpIngressPathType;
}

export interface HostOptions {
  readonly host?: string;
  readonly paths?: HttpIngressPath[];
}

export interface IngressOptions {
  readonly enabled?: boolean;
  readonly className?: string;
  readonly annotations?: Record<string, string>;
  readonly hosts?: HostOptions[];
  readonly tls?: IngressTls;
}

export interface AutoscalingOptions {
  readonly enabled?: boolean;
  readonly minReplicas?: number;
  readonly maxReplicas?: number;
  readonly targetCPUUtilizationPercentage?: number;
}

export interface IApiResource {
  readonly apiGroup?: string;
  readonly resourceType?: string;
  readonly resourceName?: string;
}

export interface MetadataDatabaseEnvOptions {
  readonly port?: number;
  readonly password?: string;
  readonly host?: string;
  readonly user?: string;
}

export interface MetaflowServiceOptions {
  readonly replicaCount?: number;
  readonly image?: ImageOptions;
  readonly imagePullSecrets?: string[];
  readonly nameOverride?: string;
  readonly fullnameOverride?: string;
  readonly serviceAccount?: ServiceAccountOptions;
  readonly podAnnotations?: Record<string, string>;
  readonly podSecurityContext?: Record<string, string>;
  readonly dbMigrations?: DbMigrationOptions;
  readonly securityContext?: SecurityContext;
  readonly service?: ServiceOptions;
  readonly ingress?: IngressOptions;
  readonly resources?: IApiResource[];
  readonly autoscaling?: AutoscalingOptions;
  readonly nodeSelector?: Record<string, string>;
  readonly tolerations?: Toleration[];
  readonly affinity?: Affinity;
  readonly envFrom?: EnvFromSource[];
  readonly metadatadb?: MetadataDatabaseEnvOptions;
}

export interface MetaflowUIOptions {
  readonly replicaCount?: number;
  readonly image?: ImageOptions;
  readonly uiImage?: ImageOptions;
  readonly imagePullSecrets?: string[];
  readonly nameOverride?: string;
  readonly fullnameOverride?: string;
  readonly env: Record<string, string>;
  readonly serviceAccount?: ServiceAccountOptions;
  readonly podAnnotations?: Record<string, string>;
  readonly podSecurityContext?: Record<string, string>;
  readonly securityContext?: SecurityContext;
  readonly service?: ServiceOptions;
  readonly serviceStatic?: ServiceOptions;
  readonly ingress?: IngressOptions;
  readonly resources?: IApiResource[];
  readonly autoscaling?: AutoscalingOptions;
  readonly nodeSelector?: Record<string, string>;
  readonly tolerations?: Toleration[];
  readonly affinity?: Affinity;
  readonly envFrom?: EnvFromSource[];
  readonly metadatadb?: MetadataDatabaseEnvOptions;
  readonly metaflowDatastoreSysrootS3?: string;
}

export interface DatabaseAuthOptions {
  readonly database?: string;
  readonly password?: string;
  readonly username?: string;
  readonly postgresPassword?: string;
  readonly enablePostgresUser?: boolean;
  readonly replicationPassword?: string;
  readonly replicationUsername?: string;
}

export interface DatabaseMetricsOptions {
  readonly enabled?: boolean;
}

export interface DatabaseResourceRequestOptions {
  readonly memory?: string;
  readonly cpu?: string;
}

export interface DatabaseResourcesOptions {
  readonly requests?: DatabaseResourceRequestOptions;
}

export interface DatabaseReplicationOptions {
  readonly enabled?: boolean;
  readonly readReplicas?: number;
}

export interface DatabaseVolumePermissionsOptions {
  readonly enabled?: boolean;
}

export interface MetadataDatabaseOptions {
  readonly auth?: DatabaseAuthOptions;
  readonly metrics?: DatabaseMetricsOptions;
  readonly resources?: DatabaseResourcesOptions;
  readonly replication?: DatabaseReplicationOptions;
  readonly architecture?: string;
  readonly volumePermissions?: DatabaseVolumePermissionsOptions;
}
