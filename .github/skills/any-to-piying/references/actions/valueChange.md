# valueChange

监听`控件`的值变更，支持多控件监听。

- 读取 [路径查询文档](../path-query.md) 查看访问其他控件应该如何操作

## 示例

### 基础用法

```ts
v.pipe(
  v.string(),
  valueChange((listen) => {
    listen({ list: [undefined] }).subscribe((value) => {
      console.log('value change', value);
    });
  }),
);
```

### 多字段监听

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    valueChange((listen) =>
      listen({ list: [undefined, ['..', 'enable']] }).subscribe((value) => {
        console.log('value list', value.list);
        console.log('field', value.field);
        console.log('listenFields', value.listenFields);
      }),
    ),
  ),
});
```
