---
name: any-to-piying
description: 将任意描述的表单需求转换为 piying-view 表单定义（基于 Valibot Schema 的元数据拓展）
---

## 能力

将用户描述的表单需求自动转换为符合 piying-view 框架的 Valibot Schema 定义,生成一个表单，包括：

- 解析表单结构（布局、控件类型）
- 推荐合适的 piying-view 组件
- 应用 Valibot 验证规则
- 配置 Action 属性和功能

### 控件类型

| 类型                                            | 说明                            | 示例                                    |
| ----------------------------------------------- | ------------------------------- | --------------------------------------- |
| [非表单控件](references/non-form-controls.yaml) | 按钮、alert、badge 等操作性组件 | button、alert、badge                    |
| [表单控件](references/form-controls.yaml)       | 支持输入/输出/验证的控件        | input、select、checkbox、toggle         |
| [表单组控件](references/form-groups.yaml)       | 嵌套子组件的容器                | fieldset、card、tabs、accordion         |
| [包装器](references/wrappers.yaml)              | 附加通用能力                    | label-wrapper、validate-tooltip-wrapper |

## 工作流程

### 1. 结构分析

分析用户描述，识别以下内容,并输出解析后的内容,markdown格式

#### 分析内容

- 每个要求需要哪些类型的组件,要参考上面的`控件类型部分`
- 每个组件需要哪些功能和属性
- 是否有特殊的布局调整

### 2. 组件实现

#### 组件查询

- 根据第一步的输出,查看yaml文档,找到合适的组件
- `非表单控件`必须使用 `v.pipe(NFCSchema,setComponent('控件name'))`
- `表单控件`名与表单字段名相同，可省略 `setComponent`(如`v.string()`);否则需要手动指定(如`v.pipe(v.string(),setComponent('textarea'))`)
- 如果在文件中未找到合适的组件,自行实现一个语义化的组件名并注释

#### 功能及属性配置

按照要求选择合适的功能并一定要先读取相关文档查看

| Action 名称及路径                                  | 功能描述                                 |
| -------------------------------------------------- | ---------------------------------------- |
| [formConfig](references/actions/formConfig.md)     | 调整表单控件的行为（禁用、转换、验证等） |
| [renderConfig](references/actions/renderConfig.md) | 控制组件是否隐藏                         |
| [disableWhen](references/actions/disableWhen.md)   | 控制控件何时禁用                         |
| [hideWhen](references/actions/hideWhen.md)         | 控制组件何时隐藏                         |
| [valueChange](references/actions/valueChange.md)   | 监听控件的值变更，支持多控件监听         |
| [outputChange](references/actions/outputChange.md) | 监听表单输出值的变化                     |
| [actions.class](references/actions/class.md)       | 设置组件的 CSS 类                        |
| [providers](references/actions/providers.md)       | 在字段的 injector 中添加服务             |
| [setAlias](references/actions/setAlias.md)         | 设置别名，方便查询                       |

**属性操作**（`actions.[`inputs`|`outputs`|`attributes`|`events`|`props`|`wrappers`].[method]`）时需要查询文档
[references/property-actions.md](references/actions/property-actions.md)

### 3. 验证完整性

检查用户描述的所有功能是否都已在输出中正确实现：

- [ ] 每个字段都有正确的验证规则
- [ ] 每个控件都选择了合适的组件类型
- [ ] 必填字段标记正确
- [ ] Action 功能完整（禁用、隐藏、监听等）
- [ ] 表单布局符合需求

---

## 输出模板

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';

export const [FormName]Define = v.pipe(
  v.object({
    // 表单字段...
    // 按钮等非表单控件使用 NFCSchema
  }),
  setComponent('fieldset'),  // 根据前面选择的`表单组控件组件`决定
);
```

---

## 示例参考

### 示例 1：用户信息表单

**需求描述：**

```html
<fieldset class="fieldset">
  <legend>用户信息</legend>
  <div class="flex flex-col">
    <label>用户名<span class="text-error">*</span></label>
    <input class="input w-full" type="text" placeholder="请输入用户名" />
  </div>
  <div class="flex flex-col">
    <label>邮箱</label>
    <input class="input w-full" type="email" placeholder="请输入邮箱" />
  </div>
  <button class="btn btn-primary" type="button">登录</button>
</fieldset>
```

**生成代码：**

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
export const UserFormDefine = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('用户名'),
      actions.attributes.patch({ placeholder: '请输入用户名' }),
      actions.class.component('w-full'),
    ),
    email: v.pipe(
      v.string(),
      v.email(),
      actions.wrappers.set(['label-wrapper']),
      v.title('邮箱'),
      actions.attributes.patch({ placeholder: '请输入邮箱' }),
      actions.class.component('w-full'),
    ),
    // 按钮不需要字段值类型,使用 NFCSchema
    __button: v.pipe(NFCSchema, setComponent('button'), actions.inputs.patch({ content: '登录', color: 'primary' })),
  }),
  setComponent('fieldset'),
);
```

### 示例 2：用户注册表单

**需求描述：**

- 用户名: 必填,带占位符"请输入用户名"
- 年龄: 数字输入,范围 18-60
- 性别: 下拉选择,选项包括"男"、"女"、"其他"
- 个人简介: 多行文本,带占位符"请输入个人简介"
- 注册按钮: 主色调

**生成代码：**

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
export const RegistrationFormDefine = v.pipe(
  v.object({
    username: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('用户名'),
      actions.attributes.patch({ placeholder: '请输入用户名' }),
    ),
    age: v.pipe(v.number(), actions.wrappers.set(['label-wrapper']), v.title('年龄'), v.minValue(18), v.maxValue(60)),
    gender: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('性别'),
      actions.inputs.patch({
        options: [
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
          { value: 'other', label: '其他' },
        ],
      }),
    ),
    bio: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('个人简介'),
      actions.attributes.patch({ placeholder: '请输入个人简介' }),
    ),
    // 按钮不需要字段值类型,使用 NFCSchema
    register: v.pipe(NFCSchema, setComponent('button'), actions.inputs.patch({ content: '注册', color: 'primary' })),
  }),
  setComponent('div'),
);
```

---

---
