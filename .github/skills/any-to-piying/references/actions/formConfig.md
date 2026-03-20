# formConfig

用于调整`表单控件`的行为：

## 参数

| 参数              | 说明                                             |
| ----------------- | ------------------------------------------------ |
| `disabled`        | 是否禁用                                         |
| `disabledValue`   | 禁用时值是否删除（默认删除）                     |
| `transformer`     | 输入/输出值时进行转换                            |
| `pipe`            | 输出值时的防抖处理（rxjs pipe）                  |
| `validators`      | 表单验证（推荐使用 `v.check`）                   |
| `asyncValidators` | 异步表单验证                                     |
| `updateOn`        | 输出值时机（change/blur/submit）                 |
| `emptyValue`      | 空值时的默认返回值（仅 array/group/logic group） |
| `deletionMode`    | array 子项删除时的处理方式（undefined/跳过）     |

## 示例

### 基础禁用配置

```ts
v.pipe(v.string(), formConfig({ disabled: true }));
```

### 输入输出转换

```ts
v.pipe(
  v.string(),
  formConfig({
    transformer: {
      toView(value, control) {
        return `1${value ?? ''}`;
      },
      toModel(value, control) {
        return (value ?? '').slice(1);
      },
    },
  }),
  actions.hooks.merge({
    allFieldsResolved: (field) => {
      field.form.control.valueChanges.subscribe((value) => {
        console.log(value);
      });
    },
  }),
);
```

### 更新时机配置

```ts
v.pipe(v.string(), formConfig({ updateOn: 'blur' }));
```