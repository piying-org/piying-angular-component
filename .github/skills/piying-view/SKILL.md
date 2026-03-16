---
name: piying-view
description: '**WORKFLOW SKILL** — 使用 Piying-view 进行跨框架表单开发。USE FOR: 定义表单 Schema、实现表单控件、配置组件属性、设置表单验证、迁移 ngx-formly/ react-hook-form/ vee-validate 等表单库。DO NOT USE FOR: 创建表单 UI 视图文件；编写非表单相关的业务逻辑；调试运行时错误。INVOKES: file system tools (read/write customization files), ask-questions tool (interview user for requirements). FOR SINGLE OPERATIONS: 对于简单的单个任务（如添加单个 Action），直接编辑文件即可，无需调用此技能。'
---

# Piying-view 技能指南

## 概述

Piying-view 是一个跨框架表单解决方案，支持 Angular、Vue、React、Svelte 和 Solid 框架。它通过 Valibot 的 Schema 定义，实现统一的表单开发体验。

### 核心特点

- 为不同框架提供统一的表单开发体验
- 一次 Schema 定义，解决默认值、验证、类型、组件样式布局等问题
- 支持布局移动（动态调整组件位置）
- 支持逻辑或/与（anyOf/oneOf）
- 表单控件的 model-view/view-model 分离

### 当前支持的框架

- Angular
- Vue（包括 Vue2）
- React
- Svelte
- Solid

## 技能使用场景

| 场景 | 描述 | 使用方法 |
|------|------|----------|
| 快速开始 | 初始化 Piying-view 项目 | 参考"快速开始流程" |
| 组件定义 | 创建表单控件、分组、包装器 | 参考"组件定义流程" |
| 表单配置 | 配置表单属性、验证、转换 | 参考"表单配置流程" |
| 跨框架迁移 | 从其他表单库迁移 | 参考"迁移流程" |
| JsonSchema 支持 | 使用 JsonSchema 定义表单 | 参考"JsonSchema 流程" |

## 核心概念

### 组件 (Component)

与大家理解的组件一致，Piying-view 可以直接调用已支持框架的大部分组件。

#### 普通组件

设计为原子化组件，减少外部依赖，可以使用服务来获得外部数据。

```typescript
import * as v from "valibot";
import { setComponent } from "@piying/view-angular-core";

v.pipe(NFCSchema, setComponent("xxx"));
v.pipe(NFNCSchema, setComponent(XXX));
```

#### 控件 (Control)

在普通组件基础上适配 `ControlValueAccessor`，支持表单控件的输入/输出、验证、数据转换。

```typescript
import * as v from "valibot";
import { setComponent } from "@piying/view-angular-core";

v.string();
v.pipe(v.string(), setComponent("xxx"));
v.pipe(v.string(), setComponent(XXX));
```

#### 分组 (Group)

`object`/`intersect`/`union`/`tuple`/`array` 等可以包含子组件的 Schema。

```typescript
import * as v from "valibot";
import { setComponent } from "@piying/view-angular-core";

v.object({ k1: v.string() });
v.pipe(v.object({ k1: v.string() }), setComponent("xxx"));
```

#### 包装器 (Wrapper)

让组件附加额外的能力，比如显示控件的标签、验证内容、前后缀等。

```typescript
import * as v from "valibot";
import { actions, setComponent } from "@piying/view-angular-core";

v.pipe(v.string(), v.title("label"), actions.wrappers.set(["label"]));
```

### Action/Pipe/Schema

Piying-view 使用 Valibot 的 Action、Pipe、Schema 概念：

- **Schema**: 数据定义（如 `v.string()`、`v.object()`）
- **Pipe**: 修饰符链式调用
- **Action**: 元数据设置（如 `v.title()`、`setComponent()`）

### 字段 (Field)

解析 Valibot 定义后出现，保存组件的配置及控件的状态。

#### 字段状态

- `disabled$$`: 是否禁用（Signal）
- `touched$$` / `untouched$$`: 控件使用过/未使用过
- `dirty$$` / `pristine$$`: 控件发射过值/未发射过值
- `valid$$` / `invalid$$` / `pending$$`: 验证状态

#### 字段属性

- `inputs$$`: 组件输入属性
- `outputs$$`: 组件输出属性
- `attributes$$`: HTML 原生属性
- `events$$`: HTML 原生事件
- `props$$`: 通用属性
- `wrappers$$`: 包装器列表

### 路径查询

在 `outputChange`、`valueChange`、`hideWhen`、`disableWhen` 等 Action 中使用：

- `#`: 查询根级配置
- `..`: 查询父级
- `@xx`: 查询别名为 `xx` 的控件

## 快速开始流程

### 1. 安装依赖

根据框架选择安装对应的 Piying-view 包和 Valibot：

```shell
# Angular
npm i @piying/view-angular @piying/view-angular-core
npm i valibot

# Vue
npm i @piying/view-vue @piying/view-vue-core
npm i valibot

# React
npm i @piying/view-react @piying/view-react-core
npm i valibot

# Svelte
npm i @piying/view-svelte @piying/view-svelte-core
npm i valibot

# Solid
npm i @piying/view-solid @piying/view-solid-core
npm i valibot
```

### 2. 创建表单 Schema

使用 Valibot 定义表单结构：

```typescript
import * as v from "valibot";

const schema = v.object({
  username: v.string(),
  email: v.string(),
  password: v.string(),
});
```

### 3. 配置表单

使用 Actions 配置表单控件：

```typescript
import * as v from "valibot";
import { setComponent, actions } from "@piying/view-angular-core";

const schema = v.object({
  username: v.pipe(
    v.string(),
    v.title("用户名"),
    v.required(),
    actions.wrappers.set(["label", "validator"]),
    actions.attributes.patch({ placeholder: "请输入用户名" })
  ),
  email: v.pipe(
    v.string(),
    v.title("邮箱"),
    v.email(),
    v.required(),
    setComponent("email"),
    actions.wrappers.set(["label", "validator"])
  ),
  password: v.pipe(
    v.string(),
    v.title("密码"),
    v.required(),
    v.minLength(6),
    setComponent("password"),
    actions.wrappers.set(["label", "validator"])
  ),
});
```

### 4. 初始化表单

```typescript
import { v4 as uuidv4 } from "uuid";
import { createForm } from "@piying/view-angular";

const form = createForm({
  schema,
  options: {
    id: uuidv4(),
  },
});
```

## 组件定义流程

### 1. 普通组件定义

```typescript
import { Component, forwardRef } from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BaseControl } from "@piying/view-angular";

@Component({
  selector: "app-input",
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFCC),
      multi: true,
    },
  ],
  template: `<input type="text" [ngModel]="value$()" (ngModelChange)="valueChange($event)" />`,
})
export class InputFCC extends BaseControl {}
```

### 2. Vue 组件定义

```vue
<script setup lang="ts">
import { useControlValueAccessor } from "@piying/view-vue";
import { vModelDynamic } from "vue";

const {
  cva,
  cvaa: { value, disabled, valueChange, touchedChange },
} = useControlValueAccessor();

defineExpose({ cva });
</script>
<template>
  <input type="text" class="input" v-model-dynamic="value" :onUpdate:modelValue="valueChange" v-bind:disabled="disabled" @blur="touchedChange" />
</template>
```

### 3. React 组件定义

```tsx
import type { ControlValueAccessor } from "@piying/view-core";
import { CVA, useControlValueAccessor, useInputTextModel } from "@piying/view-react";
import { useImperativeHandle } from "react";

interface PiInputOptions {
  [CVA]: React.RefObject<ControlValueAccessor>;
}

export function InputText(props: PiInputOptions) {
  const { cva, cvaa } = useControlValueAccessor();
  useImperativeHandle(props[CVA], () => cva, [cva]);
  const textModel = useInputTextModel(cvaa, false);
  
  return (
    <>
      <input type="text" className="input" {...textModel} />
    </>
  );
}
```

## 表单配置流程

### 1. 配置表单属性

```typescript
import * as v from "valibot";
import { formConfig, hideWhen, disableWhen } from "@piying/view-angular-core";

// 禁用配置
v.pipe(
  v.string(),
  formConfig({
    disabled: true,
    disabledValue: undefined,
    updateOn: "blur",
    emptyValue: [],
  })
);

// 隐藏配置
v.pipe(
  v.string(),
  hideWhen({
    disabled: true,
    listen: (fn) => fn({ list: [["..", "enable"]] }),
  })
);

// 禁用条件
v.pipe(
  v.string(),
  disableWhen({
    listen: (fn, field) => fn({ list: [["..", "enable"]] }),
  })
);
```

### 2. 配置转换器

```typescript
import * as v from "valibot";
import { formConfig } from "@piying/view-angular-core";

v.pipe(
  v.string(),
  formConfig({
    transfomer: {
      toView: (value) => {
        // 模型到视图的转换
        return value;
      },
      toModel: (value) => {
        // 视图到模型的转换
        return value;
      },
    },
    pipe: {
      toModel: (stream) => {
        // RxJS 管道处理（如防抖）
        return stream;
      },
    },
  })
);
```

### 3. 配置验证

```typescript
import * as v from "valibot";
import { formConfig } from "@piying/view-angular-core";

// Valibot 验证（推荐）
v.pipe(
  v.string(),
  v.required(),
  v.minLength(3),
  v.maxLength(20)
);

// 表单验证
v.pipe(
  v.string(),
  formConfig({
    validators: [
      {
        async: false,
        errorKey: "minLength",
        validator: (value) => value.length >= 3,
      },
    ],
    asyncValidators: [
      {
        errorKey: "unique",
        validator: (value) => checkUnique(value),
      },
    ],
  })
);
```

### 4. 监听值变化

```typescript
import * as v from "valibot";
import { valueChange, outputChange } from "@piying/view-angular-core";

// 监听控件值变更
v.pipe(
  v.string(),
  valueChange((listen) => {
    listen({ list: [["..", "enable"]] }).subscribe((value) => {
      // 处理值变化
    });
  })
);

// 监听输出变化
v.pipe(
  v.string(),
  outputChange((fn) => {
    fn([
      { list: undefined, output: "output1" },
      { list: ["..", "k1"], output: "output2" },
    ]).subscribe((value) => {
      // 处理输出变化
    });
  })
);
```

## 迁移流程

### 从 ngx-formly 迁移

1. **基本字段迁移**

```typescript
// ngx-formly
fields: {
  key: 'username',
  type: 'input',
  templateOptions: {
    label: '用户名',
    placeholder: '请输入用户名',
    required: true
  }
}

// Piying-view
v.pipe(
  v.string(),
  v.title("用户名"),
  v.required(),
  setComponent("input"),
  actions.attributes.patch({ placeholder: "请输入用户名" }),
  actions.wrappers.set(["label", "validator"])
)
```

2. **条件显示迁移**

```typescript
// ngx-formly
hideExpression: 'model.hideField'

// Piying-view
hideWhen({
  listen: (fn) => fn({ list: [['#', 'hideField']] })
})
```

3. **动态属性迁移**

```typescript
// ngx-formly
templateOptions: {
  description: (model, formState) => `Hello ${model.name}`
}

// Piying-view
actions.props.patchAsync({
  description: (field) => field.context.awesomeIsForced
})
```

### 从 react-hook-form 迁移

1. **验证迁移**

```typescript
// react-hook-form
register('username', { required: true, minLength: 3 })

// Piying-view
v.pipe(
  v.string(),
  v.required(),
  v.minLength(3)
)
```

2. **自定义验证迁移**

```typescript
// react-hook-form
register('password', {
  validate: (value) => value.includes('special') || '必须包含特殊字符'
})

// Piying-view
v.pipe(
  v.string(),
  v.custom((value) => value.includes('special') || '必须包含特殊字符')
)
```

### 从 vee-validate 迁移

1. **基本验证迁移**

```typescript
// vee-validate
<input v-model="value" rules="required|min:3" />

// Piying-view
v.pipe(
  v.string(),
  v.required(),
  v.minLength(3)
)
```

2. **异步验证迁移**

```typescript
// vee-validate
rules="required|asyncValidate"

// Piying-view
v.pipe(
  v.string(),
  v.required(),
  formConfig({
    asyncValidators: [{
      errorKey: 'asyncValidate',
      validator: (value) => asyncValidation(value)
    }]
  })
)
```

## JsonSchema 支持流程

### 1. 基本类型支持

```json
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string"
    },
    "age": {
      "type": "number"
    },
    "active": {
      "type": "boolean"
    }
  },
  "required": ["username"]
}
```

### 2. 枚举类型

```json
{
  "type": "object",
  "properties": {
    "gender": {
      "type": "string",
      "enum": ["male", "female", "other"]
    }
  }
}
```

### 3. oneOf/anyOf 支持

```json
{
  "type": "object",
  "properties": {
    "contact": {
      "oneOf": [
        {
          "properties": {
            "type": { "const": "email" },
            "value": { "type": "string" }
          }
        },
        {
          "properties": {
            "type": { "const": "phone" },
            "value": { "type": "string" }
          }
        }
      ]
    }
  }
}
```

### 4. allOf 支持

```json
{
  "type": "object",
  "properties": {
    "user": {
      "allOf": [
        {
          "properties": {
            "name": { "type": "string" }
          }
        },
        {
          "properties": {
            "age": { "type": "number" }
          }
        }
      ]
    }
  }
}
```

## 常用 Actions 参考

### setComponent

设置组件类型：

```typescript
v.pipe(v.string(), setComponent("textarea"));
v.pipe(v.string(), setComponent(TextareaComponent));
```

### formConfig

配置表单控件：

```typescript
v.pipe(
  v.string(),
  formConfig({
    disabled: false,
    disabledValue: undefined,
    transfomer: { toView: (v) => v, toModel: (v) => v },
    pipe: { toModel: (s) => s },
    validators: [],
    asyncValidators: [],
    updateOn: "change",
    emptyValue: [],
  })
)
```

### renderConfig

配置渲染选项：

```typescript
v.pipe(
  v.string(),
  renderConfig({
    hidden: false,
  })
)
```

### actions.* methods

#### inputs/outputs/attributes/events

```typescript
// set - 覆盖所有值
v.pipe(schema, actions.inputs.set({ prop: "value" }));

// patch - 覆盖已存在的值
v.pipe(schema, actions.inputs.patch({ prop: "value" }));

// patchAsync - 支持异步
v.pipe(schema, actions.inputs.patchAsync({ prop: (field) => "value" }));

// mapAsync - 动态数据转换
v.pipe(
  schema,
  actions.inputs.patch({ prop: "value" }),
  actions.inputs.mapAsync((field) => (value) => ({
    ...value,
    custom: field.props()["value"],
  }))
);
```

#### class

```typescript
// 在当前定义的顶层增加类
v.pipe(schema, actions.class.top("class-name", true));

// 在当前定义的内层增加类（组件自身）
v.pipe(schema, actions.class.bottom("class-name"));
```

### layout

移动组件位置：

```typescript
v.pipe(
  schema,
  layout({ priority: -1 })  // 越小越靠前
)

v.pipe(
  schema,
  layout({ keyPath: ["#"] })  // 移动到根级
)
```

### setAlias

设置别名用于路径查询：

```typescript
v.object({
  value1: v.pipe(v.string(), setAlias("value1")),
  __btn: v.pipe(
    NFCSchema,
    setComponent("button"),
    actions.inputs.patchAsync({
      clicked: (field) => {
        return () => {
          console.log(field.get(["@value1"]));
        };
      },
    }),
  ),
});
```

## 框架特定说明

### Angular

- 使用 `BaseControl` 基类实现控件
- 通过 `NG_VALUE_ACCESSOR` 提供服务
- 支持 `Signal` 风格的响应式编程

### Vue

- 使用 `useControlValueAccessor` Hook
- 支持 `vModelDynamic` 指令
- 使用 `signalToRef` 转换 Signal 到 Ref

### React

- 使用 `useControlValueAccessor` Hook
- 通过 `CVA` token 传递控件实例
- 使用 `useSignalToRef` 转换 Signal 到 Ref

### Svelte

- 使用 `useControlValueAccessor` Hook
- 支持 `bind:value` 语法
- 使用 `signalToState` 转换 Signal 到 State

### Solid

- 使用 `useControlValueAccessor` Hook
- 通过 `CVA` token 传递控件实例
- 使用 `createSignalConvert` 转换 Signal

## 常见问题

### Q1: 如何选择组件类型？

- 普通组件：不需要表单交互的组件（如按钮、标题）
- 控件：需要表单交互的组件（如输入框、选择器）
- 分组：包含子组件的容器（如对象、数组）

### Q2: 如何实现字段之间的联动？

使用 `valueChange` 或 `hideWhen`、`disableWhen`：

```typescript
valueChange((listen) => {
  listen({ list: [["..", "field1"]] }).subscribe((value) => {
    // 根据 field1 的值更新 field2
  });
});
```

### Q3: 如何实现动态表单？

使用 `v.record()` 或 `v.array()`：

```typescript
v.object({
  items: v.array(
    v.object({
      name: v.string(),
      value: v.string(),
    })
  ),
});
```

### Q4: 如何实现自定义验证？

使用 Valibot 的 `v.custom()`：

```typescript
v.pipe(
  v.string(),
  v.custom((value) => value.startsWith("abc") || "必须以 abc 开头")
)
```

## 资源链接

- 项目地址: https://github.com/piying-org/piying-view
- Angular 模板: https://github.com/piying-org/piying-view-angular-template
- Vue 模板: https://github.com/piying-org/piying-view-vue-template
- React 模板: https://github.com/piying-org/piying-view-react-template
- Svelte 模板: https://github.com/piying-org/piying-view-svelte-template
- Solid 模板: https://github.com/piying-org/piying-view-solid-template
- JsonSchema 游乐场: https://piying-org.github.io/website/jsonschema-playground
- react-hook-form 迁移示例: https://piying-org.github.io/react-hook-form-migration/
- vee-validate 迁移示例: https://piying-org.github.io/vee-validate-migration/
- react-tanstack 迁移示例: https://piying-org.github.io/react-tanstack-migration/
