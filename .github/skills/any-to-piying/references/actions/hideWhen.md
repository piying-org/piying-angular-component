# hideWhen

控制`组件`何时隐藏。
- 读取 [路径查询文档](../path-query.md) 查看访问其他控件应该如何操作
## 参数

| 参数       | 说明                                |
| ---------- | ----------------------------------- |
| `disabled` | 隐藏时是否同时禁用控件（默认 true） |
| `listen`   | 监听其他控件的值变化                |

## 示例

```ts
v.object({
  enable: v.pipe(v.boolean()),
  value: v.pipe(
    v.string(),
    hideWhen({
      disabled: true,
      listen: (fn, field) =>
        fn({
          list: [['..', 'enable']],
        }).pipe(map((item) => !item.list[0])),
    }),
  ),
});
```
