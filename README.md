# cdk8s-metaflow

Collection of cdk8s constructs for deploying [Metaflow](https://metaflow.org) on Kubernetes.

### Imports

```shell
cdk8s import k8s@1.22.0 -l typescript -o src/imports
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add argo https://charts.bitnami.com/bitnami
helm repo add autoscaler https://kubernetes.github.io/autoscaler
```
