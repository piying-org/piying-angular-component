# renderConfig

用于控制组件的渲染配置。

## 参数

| 参数     | 说明             |
| -------- | ---------------- |
| `hidden` | 控制组件是否隐藏 |

## 示例

```ts
v.object({
  k1: v.pipe(v.optional(v.string(), 'k2  hidden'), renderConfig({ hidden: true })),
  k2: v.pipe(v.string(), renderConfig({ hidden: false })),
});
```
