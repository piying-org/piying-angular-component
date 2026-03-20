# setAlias

设置别名,方便查询。

## 示例

```ts
v.object({
  value1: v.pipe(v.string(), setAlias('value1')),
  __btn: v.pipe(
    NFCSchema,
    setComponent('button'),
    actions.inputs.patchAsync({
      clicked: (field) => {
        return () => {
          console.log(field.get(['@value1']));
        };
      },
    }),
  ),
});
```
