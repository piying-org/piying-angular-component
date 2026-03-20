# actions.class

用于设置组件的 CSS 类。

## top

在当前定义的顶层增加类(顶级的wrapper或组件)。

### 示例

- 在当前定义的顶层增加类(顶级的wrapper或组件)

```ts
v.pipe(v.string(), actions.wrappers.set(['block']), actions.class.top('testa'));
```

- 默认为替换当前类,也可以设置`true`合并已有类

```ts
v.pipe(v.string(), actions.wrappers.set(['block']), actions.class.top('testa'), actions.class.top('testb', true));
```

## bottom(component)

设置组件自身的类,与`top`类似。

### 示例

```ts
v.pipe(v.string(), actions.wrappers.set(['block']), actions.class.bottom('testa'));
```
