export enum ImagePullPolicy {
  ALWAYS = 'Always',
  IF_NOT_PRESENT = 'IfNotPresent',
  NEVER = 'Never',
}

export enum HttpIngressPathType {
  PREFIX = 'Prefix',
  EXACT = 'Exact',
  IMPLEMENTATION_SPECIFIC = 'ImplementationSpecific',
}

export enum ServiceType {
  CLUSTER_IP = 'ClusterIP',
  NODE_PORT = 'NodePort',
  LOAD_BALANCER = 'LoadBalancer',
  EXTERNAL_NAME = 'ExternalName',
}
