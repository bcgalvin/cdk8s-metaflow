# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MetaflowService <a name="MetaflowService" id="cdk8s-metaflow.MetaflowService"></a>

#### Initializers <a name="Initializers" id="cdk8s-metaflow.MetaflowService.Initializer"></a>

```typescript
import { MetaflowService } from 'cdk8s-metaflow'

new MetaflowService(scope: Construct, id: string, props?: MetaflowServiceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowService.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowService.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowService.Initializer.parameter.props">props</a></code> | <code><a href="#cdk8s-metaflow.MetaflowServiceProps">MetaflowServiceProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk8s-metaflow.MetaflowService.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk8s-metaflow.MetaflowService.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk8s-metaflow.MetaflowService.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk8s-metaflow.MetaflowServiceProps">MetaflowServiceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowService.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk8s-metaflow.MetaflowService.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowService.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk8s-metaflow.MetaflowService.isConstruct"></a>

```typescript
import { MetaflowService } from 'cdk8s-metaflow'

MetaflowService.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk8s-metaflow.MetaflowService.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowService.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk8s-metaflow.MetaflowService.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### MetaflowServiceProps <a name="MetaflowServiceProps" id="cdk8s-metaflow.MetaflowServiceProps"></a>

#### Initializer <a name="Initializer" id="cdk8s-metaflow.MetaflowServiceProps.Initializer"></a>

```typescript
import { MetaflowServiceProps } from 'cdk8s-metaflow'

const metaflowServiceProps: MetaflowServiceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk8s-metaflow.MetaflowServiceProps.property.image">image</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowServiceProps.property.metadataServicePort">metadataServicePort</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowServiceProps.property.serviceAccountName">serviceAccountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowServiceProps.property.serviceName">serviceName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk8s-metaflow.MetaflowServiceProps.property.upgradesServicePort">upgradesServicePort</a></code> | <code>number</code> | *No description.* |

---

##### `image`<sup>Optional</sup> <a name="image" id="cdk8s-metaflow.MetaflowServiceProps.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

---

##### `metadataServicePort`<sup>Optional</sup> <a name="metadataServicePort" id="cdk8s-metaflow.MetaflowServiceProps.property.metadataServicePort"></a>

```typescript
public readonly metadataServicePort: number;
```

- *Type:* number

---

##### `serviceAccountName`<sup>Optional</sup> <a name="serviceAccountName" id="cdk8s-metaflow.MetaflowServiceProps.property.serviceAccountName"></a>

```typescript
public readonly serviceAccountName: string;
```

- *Type:* string

---

##### `serviceName`<sup>Optional</sup> <a name="serviceName" id="cdk8s-metaflow.MetaflowServiceProps.property.serviceName"></a>

```typescript
public readonly serviceName: string;
```

- *Type:* string

---

##### `upgradesServicePort`<sup>Optional</sup> <a name="upgradesServicePort" id="cdk8s-metaflow.MetaflowServiceProps.property.upgradesServicePort"></a>

```typescript
public readonly upgradesServicePort: number;
```

- *Type:* number

---



