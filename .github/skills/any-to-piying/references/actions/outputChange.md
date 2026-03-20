# outputChange

监听表单输出值的变化。
- 读取 [路径查询文档](../path-query.md) 查看访问其他控件应该如何操作
## 示例

```typescript
outputChange((fn) => {
  fn([
    { list: undefined, output: 'output1' },
    { list: ['..', 'k1'], output: 'output2' },
  ]).subscribe((value) => {});
});
```
