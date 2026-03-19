---
name: form-schema-generator
description: "**WORKFLOW SKILL** — 根据任意表单描述生成 piying-view Valibot Schema 定义。输出元数据而非完整实现,开发者需自行实现组件。"
---

# 表单 Schema 生成器核心流程

## 核心流程

### 步骤 1: 输入描述解析

**输入**: 任意与表单生成相关的描述

**输出**: 组件/容器/包装器的结构化信息

**解析要点**:
- 识别组件类型(输入框、选择器、按钮等)
- 识别容器类型(fieldset、div、card、tabs 等)
- 识别包装器需求(标签、验证提示等)
- 识别布局结构(垂直、水平、网格等)

**示例**:
```html
<!-- HTML 输入 -->
<input type="email" placeholder="请输入邮箱" />
```
```text
<!-- 自然语言输入 -->
邮箱输入框,带占位符"请输入邮箱"
```
```text
<!-- UI 描述输入 -->
表单容器包含:
- 用户名输入框(必填)
- 邮箱输入框
- 提交按钮
```

---

### 步骤 2: 组件/容器/包装器识别

**查询策略**: 优先查 JSON 文件,未找到则语义化创建

**参考文件**:
- `references/form-controls.json` - 表单控件(input、select、textarea、calendar、rating、toggle、checkbox 等)
- `references/non-form-controls.json` - 非表单控件(button、alert、avatar、badge 等)
- `references/form-groups.json` - 表单组容器(fieldset、card、tabs、accordion、steps 等)
- `references/wrappers.json` - 包装器(label-wrapper、validate-tooltip-wrapper 等)

**查找到的组件**: 直接使用 JSON 中定义
**未找到的组件**: 语义化命名,添加注释提示开发者实现

**示例**:
```typescript
// 已存在的组件
"密码输入框" → 查找 form-controls.json → 使用 "password"
// → setComponent('password')

// 未知组件
"视频播放器" → 未找到 → 语义化创建
// → setComponent('video-player') // TODO: 开发者需实现 video-player 组件
```

---

### 步骤 3: Schema 组合输出

**组合规则**:
- 控件: `v.pipe(v.string() / v.number() / v.boolean(), setComponent('xxx'), ...)`
- 容器: `v.pipe(v.object(), setComponent('xxx'), ...)`
- 包装器: `actions.wrappers.set(['xxx'])`
- 属性: `actions.class.component('xxx')`, `actions.attributes.patch({...})`, `actions.inputs.patch({...})`
- 验证: `v.required()`, `v.email()`, `v.minValue()`, `v.maxLength()` 等

**参考文件**:
- `references/action.md` - 所有可用的 Action 方法,用于修改组件属性和行为
- `references/path-query.md` - Action 中路径查询语法,用于在 `valueChange`、`hideWhen`、`disableWhen` 等场景中定位其他字段

**输出格式**:
```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';

export const FormDefine = v.pipe(
  v.object({
    fieldName: v.pipe(
      v.string(), // 或 v.number(), v.boolean() 等
      actions.wrappers.set(['label-wrapper', 'validate-tooltip-wrapper']), // 包装器
      v.title('字段标题'),
      v.required(), // 验证
      actions.class.component('w-full'), // 样式
      actions.attributes.patch({ placeholder: '请输入...' }), // 属性
      actions.inputs.patch({ options: [...] }), // 组件输入
      setComponent('input'), // 组件名称
    ),
  }),
  setComponent('fieldset'), // 容器
);
```

---

## 完整示例

### 示例 1: HTML 表单反向工程

**输入**:
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

**输出**:
```typescript
export const UserFormDefine = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('用户名'),
      v.required(),
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
    __button: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({ content: '登录', color: 'primary' }),
    ),
  }),
  setComponent('fieldset'),
);
```

### 示例 2: 自然语言描述

**输入**:
```
请创建一个用户注册表单:
- 用户名: 必填,带占位符"请输入用户名"
- 年龄: 数字输入,范围 18-60
- 性别: 下拉选择,选项包括"男"、"女"、"其他"
- 个人简介: 多行文本,带占位符"请输入个人简介"
- 注册按钮: 主色调
```

**输出**:
```typescript
export const RegistrationFormDefine = v.pipe(
  v.object({
    username: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('用户名'),
      v.required(),
      actions.attributes.patch({ placeholder: '请输入用户名' }),
    ),
    age: v.pipe(
      v.number(),
      actions.wrappers.set(['label-wrapper']),
      v.title('年龄'),
      v.minValue(18),
      v.maxValue(60),
    ),
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
    register: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({ content: '注册', color: 'primary' }),
    ),
  }),
  setComponent('div'),
);
```

---

## 快速参考

### 控件映射表

| 描述 | JSON 文件 | 组件名 | Schema |
|------|----------|--------|--------|
| 文本/数字/日期输入 | form-controls.json | `input` | `v.string()` / `v.number()` |
| 密码框 | form-controls.json | `password` | `v.pipe(v.string(), setComponent('password'))` |
| 邮箱框 | form-controls.json | `input` | `v.pipe(v.string(), v.email(), setComponent('email'))` |
| 下拉选择 | form-controls.json | `select` | `v.pipe(v.string(), setComponent('select'))` |
| 复选框 | form-controls.json | `checkbox` | `v.pipe(v.boolean(), setComponent('checkbox'))` |
| 开关 | form-controls.json | `toggle` | `v.pipe(v.boolean(), setComponent('toggle'))` |
| 日期选择 | form-controls.json | `calendar` | `v.pipe(NFCSchema, setComponent('calendar'))` |
| 评分 | form-controls.json | `rating` | `v.pipe(NFCSchema, setComponent('rating'))` |
| 按钮 | non-form-controls.json | `button` | `v.pipe(NFCSchema, setComponent('button'))` |
| 卡片 | form-groups.json | `card` | `v.pipe(v.object(), setComponent('card'))` |
| fieldset | wrappers.json | `fieldset` | `v.pipe(v.object(), setComponent('fieldset'))` |

### 常用 Actions

| 需求 | Action |
|------|--------|
| 添加标签 | `actions.wrappers.set(['label-wrapper'])` |
| 添加验证提示 | `actions.wrappers.set(['validate-tooltip-wrapper'])` |
| 添加样式 | `actions.class.component('w-full')` |
| 添加属性 | `actions.attributes.patch({ placeholder: '...' })` |
| 添加组件输入 | `actions.inputs.patch({ content: '...' })` |
| 必填验证 | `v.required()` |
| 邮箱验证 | `v.pipe(v.string(), v.email())` |
| 范围验证 | `v.pipe(v.number(), v.minValue(0), v.maxValue(100))` |
| 长度验证 | `v.pipe(v.string(), v.minLength(3), v.maxLength(20))` |
| 设置标题 | `v.title('字段标题')` |
| 设置组件 | `setComponent('component-name')` |

### 容器类型

| 描述 | 容器名 | Schema |
|------|--------|--------|
| 垂直布局 | `div` | `v.pipe(v.object(), setComponent('div'))` |
| 字段集 | `fieldset` | `v.pipe(v.object(), setComponent('fieldset'))` |
| 卡片 | `card` | `v.pipe(v.object(), setComponent('card'))` |
| 标签页 | `tabs` | `v.pipe(v.object(), setComponent('tabs'))` |
| 手风琴 | `accordion` | `v.pipe(v.object(), setComponent('accordion'))` |
| 步骤 | `steps` | `v.pipe(v.object(), setComponent('steps'))` |

### Action 参考

| 需求 | Action 方法 | 参考文档 |
|------|------------|----------|
| 修改控件行为 | `formConfig`、`renderConfig`、`asControl`、`asVirtualGroup` | [action.md](references/action.md) |
| 控件显示/禁用控制 | `hideWhen`、`disableWhen` | [action.md](references/action.md) + [path-query.md](references/path-query.md) |
| 监听值变化 | `valueChange`、`outputChange` | [action.md](references/action.md) + [path-query.md](references/path-query.md) |
| 属性操作 | `actions.attributes.patch`、`actions.inputs.patch` | [action.md](references/action.md) |
| 路径查询 | `field.get([])` | [path-query.md](references/path-query.md) |
