# 属性操作

通用格式：`actions.[propertyName].[method]`

## 通用属性

- `inputs` / `outputs` / `attributes` / `events` / `props` / `wrappers`

## 方法说明

| 方法         | 说明                                    |
| ------------ | --------------------------------------- |
| `set`        | 替换当前输入设置                        |
| `patch`      | 与已有配置合并（覆盖已有）              |
| `remove`     | 删除一项/多项                           |
| `patchAsync` | `patch` 的异步版本，支持 field 和上下文 |
| `merge`      | 用于 `outputs`/`events`，允许多个监听   |
| `mergeAsync` | `merge` 的异步版本                      |
| `mapAsync`   | 对所有属性进行处理                      |

## 示例

### 覆盖前面的设置

```ts
v.pipe(NFCSchema, setComponent('button'), actions.attributes.set({ id: 'id1', 'data-k1': '1' }), actions.attributes.set({ id: 'id2' }));
```

### 覆盖已存在的值

```ts
v.pipe(NFCSchema, setComponent('button'), actions.attributes.patch({ id: 'id1', 'data-k1': '1' }), actions.attributes.patch({ id: 'id2' }));
```

### 异步设置（支持 Promise/Signal/Observable）

```ts
v.pipe(NFCSchema, setComponent('button'), actions.inputs.patchAsync({ content: () => '1' }));
```

```ts
v.pipe(
  NFCSchema,
  setComponent('button'),
  actions.inputs.patchAsync({
    content: () => {
      let ob = new BehaviorSubject(0);
      let id = setInterval(() => {
        ob.next(ob.value + 1);
        if (ob.value === 10) {
          clearInterval(id);
        }
      }, 500);
      return ob;
    },
  }),
);
```

### 动态数据映射

```ts
v.pipe(
  NFCSchema,
  setComponent('button'),
  actions.props.patch({ value: '1' }),
  actions.inputs.mapAsync((field) => {
    return (value) => ({
      ...value,
      content: field.props()['value'],
    });
  }),
);
```
