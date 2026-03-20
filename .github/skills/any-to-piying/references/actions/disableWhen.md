# disableWhen

控制`控件`何时禁用。
- 读取 [路径查询文档](../path-query.md) 查看访问其他控件应该如何操作
## 示例

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    disableWhen({
      listen: (fn, field) =>
        fn({
          list: [['..', 'enable']],
        }).pipe(map((item) => !item.list[0])),
    }),
  ),
});
```
