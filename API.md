# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MetaflowService <a name="MetaflowService" id="cdk8s-metaflow.MetaflowService"></a>

#### Initializers <a name="Initializers" id="cdk8s-metaflow.MetaflowService.Initializer"></a>

```typescript
import { MetaflowService } from 'cdk8s-metaflow'

new MetaflowService(scope: Construct, name: string, props: MetaflowChartProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowService.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowService.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowService.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-metaflow.MetaflowChartProps">MetaflowChartProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-metaflow.MetaflowService.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `name`<sup>Required</sup> <a name="name" id="cdk8s-metaflow.MetaflowService.Initializer.parameter.name"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk8s-metaflow.MetaflowService.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-metaflow.MetaflowChartProps">MetaflowChartProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowService.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk8s-metaflow.MetaflowService.addDependency">addDependency</a></code> | Create a dependency between this Chart and other constructs. |
| <code><a href="#cdk8s-metaflow.MetaflowService.generateObjectName">generateObjectName</a></code> | Generates a app-unique name for an object given it's construct node path. |
| <code><a href="#cdk8s-metaflow.MetaflowService.toJson">toJson</a></code> | Renders this chart to a set of Kubernetes JSON resources. |

---

##### `toString` <a name="toString" id="cdk8s-metaflow.MetaflowService.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="cdk8s-metaflow.MetaflowService.addDependency"></a>

```typescript
public addDependency(dependencies: IConstruct): void
```

Create a dependency between this Chart and other constructs.

These can be other ApiObjects, Charts, or custom.

###### `dependencies`<sup>Required</sup> <a name="dependencies" id="cdk8s-metaflow.MetaflowService.addDependency.parameter.dependencies"></a>

- *Type:* constructs.IConstruct

the dependencies to add.

---

##### `generateObjectName` <a name="generateObjectName" id="cdk8s-metaflow.MetaflowService.generateObjectName"></a>

```typescript
public generateObjectName(apiObject: ApiObject): string
```

Generates a app-unique name for an object given it's construct node path.

Different resource types may have different constraints on names
(`metadata.name`). The previous version of the name generator was
compatible with DNS_SUBDOMAIN but not with DNS_LABEL.

For example, `Deployment` names must comply with DNS_SUBDOMAIN while
`Service` names must comply with DNS_LABEL.

Since there is no formal specification for this, the default name
generation scheme for kubernetes objects in cdk8s was changed to DNS_LABEL,
since it???s the common denominator for all kubernetes resources
(supposedly).

You can override this method if you wish to customize object names at the
chart level.

###### `apiObject`<sup>Required</sup> <a name="apiObject" id="cdk8s-metaflow.MetaflowService.generateObjectName.parameter.apiObject"></a>

- *Type:* cdk8s.ApiObject

The API object to generate a name for.

---

##### `toJson` <a name="toJson" id="cdk8s-metaflow.MetaflowService.toJson"></a>

```typescript
public toJson(): any[]
```

Renders this chart to a set of Kubernetes JSON resources.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowService.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdk8s-metaflow.MetaflowService.isChart">isChart</a></code> | Return whether the given object is a Chart. |
| <code><a href="#cdk8s-metaflow.MetaflowService.of">of</a></code> | Finds the chart in which a node is defined. |

---

##### `isConstruct` <a name="isConstruct" id="cdk8s-metaflow.MetaflowService.isConstruct"></a>

```typescript
import { MetaflowService } from 'cdk8s-metaflow'

MetaflowService.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk8s-metaflow.MetaflowService.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isChart` <a name="isChart" id="cdk8s-metaflow.MetaflowService.isChart"></a>

```typescript
import { MetaflowService } from 'cdk8s-metaflow'

MetaflowService.isChart(x: any)
```

Return whether the given object is a Chart.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="cdk8s-metaflow.MetaflowService.isChart.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="cdk8s-metaflow.MetaflowService.of"></a>

```typescript
import { MetaflowService } from 'cdk8s-metaflow'

MetaflowService.of(c: IConstruct)
```

Finds the chart in which a node is defined.

###### `c`<sup>Required</sup> <a name="c" id="cdk8s-metaflow.MetaflowService.of.parameter.c"></a>

- *Type:* constructs.IConstruct

a construct node.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowService.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk8s-metaflow.MetaflowService.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | Labels applied to all resources in this chart. |
| <code><a href="#cdk8s-metaflow.MetaflowService.property.namespace">namespace</a></code> | <code>string</code> | The default namespace for all objects in this chart. |
| <code><a href="#cdk8s-metaflow.MetaflowService.property.serviceAccount">serviceAccount</a></code> | <code>cdk8s-plus-21.IServiceAccount</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk8s-metaflow.MetaflowService.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `labels`<sup>Required</sup> <a name="labels" id="cdk8s-metaflow.MetaflowService.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Labels applied to all resources in this chart.

This is an immutable copy.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk8s-metaflow.MetaflowService.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string

The default namespace for all objects in this chart.

---

##### `serviceAccount`<sup>Optional</sup> <a name="serviceAccount" id="cdk8s-metaflow.MetaflowService.property.serviceAccount"></a>

```typescript
public readonly serviceAccount: IServiceAccount;
```

- *Type:* cdk8s-plus-21.IServiceAccount

---


## Structs <a name="Structs" id="Structs"></a>

### DatabaseAuthOptions <a name="DatabaseAuthOptions" id="cdk8s-metaflow.DatabaseAuthOptions"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.DatabaseAuthOptions.Initializer"></a>

```typescript
import { DatabaseAuthOptions } from 'cdk8s-metaflow'

const databaseAuthOptions: DatabaseAuthOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.DatabaseAuthOptions.property.database">database</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.DatabaseAuthOptions.property.enablePostgresUser">enablePostgresUser</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.DatabaseAuthOptions.property.password">password</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.DatabaseAuthOptions.property.postgresPassword">postgresPassword</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.DatabaseAuthOptions.property.replicationPassword">replicationPassword</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.DatabaseAuthOptions.property.replicationUsername">replicationUsername</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.DatabaseAuthOptions.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `database`<sup>Optional</sup> <a name="database" id="cdk8s-metaflow.DatabaseAuthOptions.property.database"></a>

```typescript
public readonly database: string;
```

- *Type:* string

---

##### `enablePostgresUser`<sup>Optional</sup> <a name="enablePostgresUser" id="cdk8s-metaflow.DatabaseAuthOptions.property.enablePostgresUser"></a>

```typescript
public readonly enablePostgresUser: boolean;
```

- *Type:* boolean

---

##### `password`<sup>Optional</sup> <a name="password" id="cdk8s-metaflow.DatabaseAuthOptions.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

---

##### `postgresPassword`<sup>Optional</sup> <a name="postgresPassword" id="cdk8s-metaflow.DatabaseAuthOptions.property.postgresPassword"></a>

```typescript
public readonly postgresPassword: string;
```

- *Type:* string

---

##### `replicationPassword`<sup>Optional</sup> <a name="replicationPassword" id="cdk8s-metaflow.DatabaseAuthOptions.property.replicationPassword"></a>

```typescript
public readonly replicationPassword: string;
```

- *Type:* string

---

##### `replicationUsername`<sup>Optional</sup> <a name="replicationUsername" id="cdk8s-metaflow.DatabaseAuthOptions.property.replicationUsername"></a>

```typescript
public readonly replicationUsername: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="cdk8s-metaflow.DatabaseAuthOptions.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---

### DatabaseMetricsOptions <a name="DatabaseMetricsOptions" id="cdk8s-metaflow.DatabaseMetricsOptions"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.DatabaseMetricsOptions.Initializer"></a>

```typescript
import { DatabaseMetricsOptions } from 'cdk8s-metaflow'

const databaseMetricsOptions: DatabaseMetricsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.DatabaseMetricsOptions.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="cdk8s-metaflow.DatabaseMetricsOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

### DatabaseReplicationOptions <a name="DatabaseReplicationOptions" id="cdk8s-metaflow.DatabaseReplicationOptions"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.DatabaseReplicationOptions.Initializer"></a>

```typescript
import { DatabaseReplicationOptions } from 'cdk8s-metaflow'

const databaseReplicationOptions: DatabaseReplicationOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.DatabaseReplicationOptions.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.DatabaseReplicationOptions.property.readReplicas">readReplicas</a></code> | <code>number</code> | *No description.* |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="cdk8s-metaflow.DatabaseReplicationOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

##### `readReplicas`<sup>Optional</sup> <a name="readReplicas" id="cdk8s-metaflow.DatabaseReplicationOptions.property.readReplicas"></a>

```typescript
public readonly readReplicas: number;
```

- *Type:* number

---

### DatabaseResourceRequestOptions <a name="DatabaseResourceRequestOptions" id="cdk8s-metaflow.DatabaseResourceRequestOptions"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.DatabaseResourceRequestOptions.Initializer"></a>

```typescript
import { DatabaseResourceRequestOptions } from 'cdk8s-metaflow'

const databaseResourceRequestOptions: DatabaseResourceRequestOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.DatabaseResourceRequestOptions.property.cpu">cpu</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.DatabaseResourceRequestOptions.property.memory">memory</a></code> | <code>string</code> | *No description.* |

---

##### `cpu`<sup>Optional</sup> <a name="cpu" id="cdk8s-metaflow.DatabaseResourceRequestOptions.property.cpu"></a>

```typescript
public readonly cpu: string;
```

- *Type:* string

---

##### `memory`<sup>Optional</sup> <a name="memory" id="cdk8s-metaflow.DatabaseResourceRequestOptions.property.memory"></a>

```typescript
public readonly memory: string;
```

- *Type:* string

---

### DatabaseResourcesOptions <a name="DatabaseResourcesOptions" id="cdk8s-metaflow.DatabaseResourcesOptions"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.DatabaseResourcesOptions.Initializer"></a>

```typescript
import { DatabaseResourcesOptions } from 'cdk8s-metaflow'

const databaseResourcesOptions: DatabaseResourcesOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.DatabaseResourcesOptions.property.requests">requests</a></code> | <code><a href="#cdk8s-metaflow.DatabaseResourceRequestOptions">DatabaseResourceRequestOptions</a></code> | *No description.* |

---

##### `requests`<sup>Optional</sup> <a name="requests" id="cdk8s-metaflow.DatabaseResourcesOptions.property.requests"></a>

```typescript
public readonly requests: DatabaseResourceRequestOptions;
```

- *Type:* <a href="#cdk8s-metaflow.DatabaseResourceRequestOptions">DatabaseResourceRequestOptions</a>

---

### DatabaseVolumePermissionsOptions <a name="DatabaseVolumePermissionsOptions" id="cdk8s-metaflow.DatabaseVolumePermissionsOptions"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.DatabaseVolumePermissionsOptions.Initializer"></a>

```typescript
import { DatabaseVolumePermissionsOptions } from 'cdk8s-metaflow'

const databaseVolumePermissionsOptions: DatabaseVolumePermissionsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.DatabaseVolumePermissionsOptions.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="cdk8s-metaflow.DatabaseVolumePermissionsOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

### HelmPostgresAddonProps <a name="HelmPostgresAddonProps" id="cdk8s-metaflow.HelmPostgresAddonProps"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.HelmPostgresAddonProps.Initializer"></a>

```typescript
import { HelmPostgresAddonProps } from 'cdk8s-metaflow'

const helmPostgresAddonProps: HelmPostgresAddonProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.HelmPostgresAddonProps.property.chartVersion">chartVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.HelmPostgresAddonProps.property.namespaceName">namespaceName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.HelmPostgresAddonProps.property.chartValues">chartValues</a></code> | <code><a href="#cdk8s-metaflow.MetadataDatabaseOptions">MetadataDatabaseOptions</a></code> | *No description.* |

---

##### `chartVersion`<sup>Required</sup> <a name="chartVersion" id="cdk8s-metaflow.HelmPostgresAddonProps.property.chartVersion"></a>

```typescript
public readonly chartVersion: string;
```

- *Type:* string

---

##### `namespaceName`<sup>Required</sup> <a name="namespaceName" id="cdk8s-metaflow.HelmPostgresAddonProps.property.namespaceName"></a>

```typescript
public readonly namespaceName: string;
```

- *Type:* string

---

##### `chartValues`<sup>Optional</sup> <a name="chartValues" id="cdk8s-metaflow.HelmPostgresAddonProps.property.chartValues"></a>

```typescript
public readonly chartValues: MetadataDatabaseOptions;
```

- *Type:* <a href="#cdk8s-metaflow.MetadataDatabaseOptions">MetadataDatabaseOptions</a>

---

### LocalPostgresAddonProps <a name="LocalPostgresAddonProps" id="cdk8s-metaflow.LocalPostgresAddonProps"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.LocalPostgresAddonProps.Initializer"></a>

```typescript
import { LocalPostgresAddonProps } from 'cdk8s-metaflow'

const localPostgresAddonProps: LocalPostgresAddonProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.LocalPostgresAddonProps.property.endpointIp">endpointIp</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.LocalPostgresAddonProps.property.namespaceName">namespaceName</a></code> | <code>string</code> | *No description.* |

---

##### `endpointIp`<sup>Required</sup> <a name="endpointIp" id="cdk8s-metaflow.LocalPostgresAddonProps.property.endpointIp"></a>

```typescript
public readonly endpointIp: string;
```

- *Type:* string

---

##### `namespaceName`<sup>Optional</sup> <a name="namespaceName" id="cdk8s-metaflow.LocalPostgresAddonProps.property.namespaceName"></a>

```typescript
public readonly namespaceName: string;
```

- *Type:* string

---

### MetadataDatabaseOptions <a name="MetadataDatabaseOptions" id="cdk8s-metaflow.MetadataDatabaseOptions"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.MetadataDatabaseOptions.Initializer"></a>

```typescript
import { MetadataDatabaseOptions } from 'cdk8s-metaflow'

const metadataDatabaseOptions: MetadataDatabaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.MetadataDatabaseOptions.property.architecture">architecture</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetadataDatabaseOptions.property.auth">auth</a></code> | <code><a href="#cdk8s-metaflow.DatabaseAuthOptions">DatabaseAuthOptions</a></code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetadataDatabaseOptions.property.metrics">metrics</a></code> | <code><a href="#cdk8s-metaflow.DatabaseMetricsOptions">DatabaseMetricsOptions</a></code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetadataDatabaseOptions.property.replication">replication</a></code> | <code><a href="#cdk8s-metaflow.DatabaseReplicationOptions">DatabaseReplicationOptions</a></code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetadataDatabaseOptions.property.resources">resources</a></code> | <code><a href="#cdk8s-metaflow.DatabaseResourcesOptions">DatabaseResourcesOptions</a></code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetadataDatabaseOptions.property.volumePermissions">volumePermissions</a></code> | <code><a href="#cdk8s-metaflow.DatabaseVolumePermissionsOptions">DatabaseVolumePermissionsOptions</a></code> | *No description.* |

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="cdk8s-metaflow.MetadataDatabaseOptions.property.architecture"></a>

```typescript
public readonly architecture: string;
```

- *Type:* string

---

##### `auth`<sup>Optional</sup> <a name="auth" id="cdk8s-metaflow.MetadataDatabaseOptions.property.auth"></a>

```typescript
public readonly auth: DatabaseAuthOptions;
```

- *Type:* <a href="#cdk8s-metaflow.DatabaseAuthOptions">DatabaseAuthOptions</a>

---

##### `metrics`<sup>Optional</sup> <a name="metrics" id="cdk8s-metaflow.MetadataDatabaseOptions.property.metrics"></a>

```typescript
public readonly metrics: DatabaseMetricsOptions;
```

- *Type:* <a href="#cdk8s-metaflow.DatabaseMetricsOptions">DatabaseMetricsOptions</a>

---

##### `replication`<sup>Optional</sup> <a name="replication" id="cdk8s-metaflow.MetadataDatabaseOptions.property.replication"></a>

```typescript
public readonly replication: DatabaseReplicationOptions;
```

- *Type:* <a href="#cdk8s-metaflow.DatabaseReplicationOptions">DatabaseReplicationOptions</a>

---

##### `resources`<sup>Optional</sup> <a name="resources" id="cdk8s-metaflow.MetadataDatabaseOptions.property.resources"></a>

```typescript
public readonly resources: DatabaseResourcesOptions;
```

- *Type:* <a href="#cdk8s-metaflow.DatabaseResourcesOptions">DatabaseResourcesOptions</a>

---

##### `volumePermissions`<sup>Optional</sup> <a name="volumePermissions" id="cdk8s-metaflow.MetadataDatabaseOptions.property.volumePermissions"></a>

```typescript
public readonly volumePermissions: DatabaseVolumePermissionsOptions;
```

- *Type:* <a href="#cdk8s-metaflow.DatabaseVolumePermissionsOptions">DatabaseVolumePermissionsOptions</a>

---

### MetaflowChartProps <a name="MetaflowChartProps" id="cdk8s-metaflow.MetaflowChartProps"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.MetaflowChartProps.Initializer"></a>

```typescript
import { MetaflowChartProps } from 'cdk8s-metaflow'

const metaflowChartProps: MetaflowChartProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.labels">labels</a></code> | <code>{[ key: string ]: string}</code> | Labels to apply to all resources in this chart. |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.namespace">namespace</a></code> | <code>string</code> | The default namespace for all objects defined in this chart (directly or indirectly). |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.image">image</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.imageTag">imageTag</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.servicePort">servicePort</a></code> | <code>cdk8s-plus-21.ServicePort</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.envVars">envVars</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.initImage">initImage</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.initImageTag">initImageTag</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowChartProps.property.serviceAccount">serviceAccount</a></code> | <code>cdk8s-plus-21.IServiceAccount</code> | *No description.* |

---

##### `labels`<sup>Optional</sup> <a name="labels" id="cdk8s-metaflow.MetaflowChartProps.property.labels"></a>

```typescript
public readonly labels: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no common labels

Labels to apply to all resources in this chart.

---

##### `namespace`<sup>Optional</sup> <a name="namespace" id="cdk8s-metaflow.MetaflowChartProps.property.namespace"></a>

```typescript
public readonly namespace: string;
```

- *Type:* string
- *Default:* no namespace is synthesized (usually this implies "default")

The default namespace for all objects defined in this chart (directly or indirectly).

This namespace will only apply to objects that don't have a
`namespace` explicitly defined for them.

---

##### `image`<sup>Required</sup> <a name="image" id="cdk8s-metaflow.MetaflowChartProps.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

---

##### `imageTag`<sup>Required</sup> <a name="imageTag" id="cdk8s-metaflow.MetaflowChartProps.property.imageTag"></a>

```typescript
public readonly imageTag: string;
```

- *Type:* string

---

##### `servicePort`<sup>Required</sup> <a name="servicePort" id="cdk8s-metaflow.MetaflowChartProps.property.servicePort"></a>

```typescript
public readonly servicePort: ServicePort;
```

- *Type:* cdk8s-plus-21.ServicePort

---

##### `envVars`<sup>Optional</sup> <a name="envVars" id="cdk8s-metaflow.MetaflowChartProps.property.envVars"></a>

```typescript
public readonly envVars: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `initImage`<sup>Optional</sup> <a name="initImage" id="cdk8s-metaflow.MetaflowChartProps.property.initImage"></a>

```typescript
public readonly initImage: string;
```

- *Type:* string

---

##### `initImageTag`<sup>Optional</sup> <a name="initImageTag" id="cdk8s-metaflow.MetaflowChartProps.property.initImageTag"></a>

```typescript
public readonly initImageTag: string;
```

- *Type:* string

---

##### `serviceAccount`<sup>Optional</sup> <a name="serviceAccount" id="cdk8s-metaflow.MetaflowChartProps.property.serviceAccount"></a>

```typescript
public readonly serviceAccount: IServiceAccount;
```

- *Type:* cdk8s-plus-21.IServiceAccount

---

## Classes <a name="Classes" id="Classes"></a>

### HelmPostgresAddon <a name="HelmPostgresAddon" id="cdk8s-metaflow.HelmPostgresAddon"></a>

- *Implements:* <a href="#cdk8s-metaflow.IAddon">IAddon</a>

#### Initializers <a name="Initializers" id="cdk8s-metaflow.HelmPostgresAddon.Initializer"></a>

```typescript
import { HelmPostgresAddon } from 'cdk8s-metaflow'

new HelmPostgresAddon(props: HelmPostgresAddonProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.HelmPostgresAddon.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-metaflow.HelmPostgresAddonProps">HelmPostgresAddonProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk8s-metaflow.HelmPostgresAddon.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-metaflow.HelmPostgresAddonProps">HelmPostgresAddonProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-metaflow.HelmPostgresAddon.install">install</a></code> | *No description.* |

---

##### `install` <a name="install" id="cdk8s-metaflow.HelmPostgresAddon.install"></a>

```typescript
public install(scope: Construct): Construct
```

###### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-metaflow.HelmPostgresAddon.install.parameter.scope"></a>

- *Type:* constructs.Construct

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.HelmPostgresAddon.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk8s-metaflow.HelmPostgresAddon.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.HelmPostgresAddon.property.NAME">NAME</a></code> | <code>string</code> | *No description.* |

---

##### `NAME`<sup>Required</sup> <a name="NAME" id="cdk8s-metaflow.HelmPostgresAddon.property.NAME"></a>

```typescript
public readonly NAME: string;
```

- *Type:* string

---

### LocalPostgresAddon <a name="LocalPostgresAddon" id="cdk8s-metaflow.LocalPostgresAddon"></a>

- *Implements:* <a href="#cdk8s-metaflow.IAddon">IAddon</a>

#### Initializers <a name="Initializers" id="cdk8s-metaflow.LocalPostgresAddon.Initializer"></a>

```typescript
import { LocalPostgresAddon } from 'cdk8s-metaflow'

new LocalPostgresAddon(props: LocalPostgresAddonProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.LocalPostgresAddon.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-metaflow.LocalPostgresAddonProps">LocalPostgresAddonProps</a></code> | *No description.* |

---

##### `props`<sup>Required</sup> <a name="props" id="cdk8s-metaflow.LocalPostgresAddon.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-metaflow.LocalPostgresAddonProps">LocalPostgresAddonProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-metaflow.LocalPostgresAddon.install">install</a></code> | *No description.* |

---

##### `install` <a name="install" id="cdk8s-metaflow.LocalPostgresAddon.install"></a>

```typescript
public install(scope: Construct): Construct
```

###### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-metaflow.LocalPostgresAddon.install.parameter.scope"></a>

- *Type:* constructs.Construct

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.LocalPostgresAddon.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk8s-metaflow.LocalPostgresAddon.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.LocalPostgresAddon.property.NAME">NAME</a></code> | <code>string</code> | *No description.* |

---

##### `NAME`<sup>Required</sup> <a name="NAME" id="cdk8s-metaflow.LocalPostgresAddon.property.NAME"></a>

```typescript
public readonly NAME: string;
```

- *Type:* string

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IAddon <a name="IAddon" id="cdk8s-metaflow.IAddon"></a>

- *Implemented By:* <a href="#cdk8s-metaflow.HelmPostgresAddon">HelmPostgresAddon</a>, <a href="#cdk8s-metaflow.LocalPostgresAddon">LocalPostgresAddon</a>, <a href="#cdk8s-metaflow.IAddon">IAddon</a>

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-metaflow.IAddon.install">install</a></code> | *No description.* |

---

##### `install` <a name="install" id="cdk8s-metaflow.IAddon.install"></a>

```typescript
public install(scope: Construct): Construct
```

###### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-metaflow.IAddon.install.parameter.scope"></a>

- *Type:* constructs.Construct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.IAddon.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk8s-metaflow.IAddon.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

