# providers

提供者配置，用于在字段的 injector 中添加服务。

## providers.set

设置提供者（会覆盖所有已有的提供者）。

### 示例

```typescript
v.pipe(v.string(), actions.providers.set([Test1Service]));
```

## providers.patch

添加提供者。

### 示例

```typescript
v.pipe(v.string(), actions.providers.patch([{ provide: Test1Token, useValue: 123 }]));
```

## providers.change

动态修改提供者列表。

### 示例

```typescript
v.pipe(
  v.string(),
  actions.providers.change((providers) => [...providers, newService]),
);
```
