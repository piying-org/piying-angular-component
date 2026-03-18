---
name: form-schema-generator
description: '**WORKFLOW SKILL** — 根据任意描述(HTML、自然语言、UI 设计稿等)生成 piying-view Valibot Schema 定义。作为架构设计工具,生成的是元数据定义而非完整实现。开发者自行实现组件和功能。USE FOR: 任意形式的表单描述转换、HTML 反向工程、表单架构设计、跨框架表单迁移。DO NOT USE FOR: 组件实现；业务逻辑编写；运行时调试。INVOKES: file system tools (read/write schema files), ask-questions tool (interview user for requirements). FOR SINGLE OPERATIONS: 简单控件直接编辑文件即可。'
---

# 通用表单 Schema 生成 (Form Schema Generator) 技能指南

## 角色定位

Form Schema Generator 是一个**架构设计工具**,而不是代码生成器。

它的核心任务是:**根据任意形式的描述反向设计 piying-view 的 Valibot Schema 定义**,生成的是元数据(metadata),而不是完整的实现。

### 设计哲学

| 角色                    | 职责                   | 示例                                        |
| ----------------------- | ---------------------- | ------------------------------------------- |
| **Schema 定义**(工具)   | 设计架构,定义元数据    | `v.pipe(v.string(), setComponent('video'))` |
| **开发者**(你自己)      | 实现组件,处理业务逻辑  | 创建 `video-component` 组件                 |
| **piying-view**         | 解析 Schema,渲染 UI    | 根据定义渲染组件                            |

### 核心原则

1. **控件/组件负责显示**:只定义需要什么组件,不关心组件怎么实现
2. **包装器负责加强**:通过包装器添加标签、验证、样式等周边功能
3. **容器负责布局**:通过容器组织结构,支持动态添加组件(如数组)
4. **先定义后实现**:生成 Schema 定义,然后手动实现组件

### 适用场景

| 场景                | 描述                                          | 生成策略                                   |
| ------------------- | --------------------------------------------- | ------------------------------------------ |
| HTML 反向工程       | 有现有 HTML,需要创建 piying-view Schema       | 分析 HTML 结构,推断控件类型                |
| 自然语言描述        | 用自然语言描述表单需求,生成 Schema            | 语义理解,识别控件和布局                    |
| UI 设计稿           | 从 Figma 等设计工具的描述生成 Schema          | 分析布局和组件关系                         |
| 现有表单迁移        | 将现有 Angular/React/Vue 表单迁移到 piying-view | 识别组件选择器,匹配控件定义               |
| 表单重构            | 重构现有表单,保留功能并使用 Schema           | 分析布局容器,生成分组结构                  |
| 架构设计            | 设计新表单的架构                              | 定义组件依赖和数据结构                     |

### 组件查找策略

**优先级规则:先查表,后语义**

1. **优先从对应的 JSON 文件查找已有的组件定义**:
   - 表单控件 → [`references/form-controls.json`](./references/form-controls.json)
   - 非表单控件 → [`references/non-form-controls.json`](./references/non-form-controls.json)
   - 表单组控件 → [`references/form-groups.json`](./references/form-groups.json)
   - 包装器 → [`references/wrappers.json`](./references/wrappers.json)
   - 如果找到匹配组件,使用其预定义的组件名称和属性

2. **找不到时使用语义化创建**:
   - 对于未在 JSON 文件中定义的组件,使用语义化命名
   - 例如:视频播放器 → `setComponent('video-player')`

**组件查找参考表**:

描述中的控件类型 | JSON 文件 | 组件名 | 说明
---------------- | --------------- | --------------- | ----
`input[type="text"]` 或 "文本输入框" | form-controls.json | `input` | 基础字符串控件
`input[type="password"]` 或 "密码框" | form-controls.json | `password` | 密码控件
`input[type="email"]` 或 "邮箱输入框" | form-controls.json | `input` | 邮箱控件(使用验证器)
`input[type="number"]` 或 "数字输入框" | form-controls.json | `input` | 数字输入控件
`input[type="date"]` 或 "日期选择器" | form-controls.json | `calendar` | 日期控件
`select` 或 "下拉选择框" | form-controls.json | `select` | 下拉选择控件
`textarea` 或 "多行文本框" | form-controls.json | `textarea` | 多行文本控件
`button` 或 "按钮" | non-form-controls.json | `button` | 按钮组件
`fieldset` 或 "字段集" | wrappers.json | `fieldset` | 字段集容器
`card` 或 "卡片容器" | form-groups.json | `card` | 卡片容器
"视频播放器" | *不存在* | 视频播放器(语义化创建)

**为什么优先查 JSON 文件?**
- JSON 文件定义了项目中已有的组件,确保 Schema 使用正确的组件名称
- 避免创建不存在的组件引用
- 保证生成的 Schema 与项目实际组件一致

## 技能使用流程

### 第零步:输入分析

在开始生成 Schema 之前,先分析输入描述:

**支持的输入类型**:

```typescript
// 类型 1: HTML 片段
const input1 = `
  <input type="email" placeholder="请输入邮箱" />
`;

// 类型 2: 自然语言描述
const input2 = `
  请创建一个表单,包含:
  - 邮箱输入框,带占位符
  - 描述文本框
`;

// 类型 3: UI 设计描述
const input3 = `
  表单容器:
  - 用户名输入框(必填)
  - 年龄数字框
  - 提交按钮
`;

// 类型 4: 现有表单定义
const input4 = `
  Angular FormGroup:
  {
    name: new FormControl(''),
    age: new FormControl(0)
  }
`;
```

**分析要点**:

- [ ] **输入类型**: HTML、自然语言、UI 描述、现有表单定义
- [ ] **容器类型**: fieldset、div、card、tabs 等
- [ ] **控件类型**: input、select、textarea、button 等
- [ ] **控件属性**: placeholder、type、min、max 等
- [ ] **验证规则**: 必填、email、number 等
- [ ] **布局结构**: flex、grid、垂直排列、水平排列等
- [ ] **标签文本**: 控件的 label 或标题

### 第一步:输入类型识别

根据输入形式选择对应的分析策略:

```typescript
// 策略 A: HTML 分析
// 输入: HTML 片段
// 分析: 解析 DOM 结构、元素类型、属性
// 适用: 从现有 HTML 反向工程

// 策略 B: 自然语言分析
// 输入: 自然语言描述
// 分析: 语义理解、实体识别、关系抽取
// 适用: 从需求描述生成表单

// 策略 C: UI 描述分析
// 输入: UI 设计稿描述
// 分析: 布局分析、组件识别、样式提取
// 适用: 从设计稿生成表单

// 策略 D: 现有表单分析
// 输入: Angular/React/Vue 表单定义
// 分析: FormGroup/Schema 结构、验证规则、控件类型
// 适用: 表单迁移
```

### 第二步:控件类型映射(基于 JSON 文件)

**根据对应的 JSON 文件中定义的组件名称生成对应的 Valibot Schema**:

| 控件描述 | JSON 文件 | 组件名 | Valibot Schema | 说明 |
| ------------------------- | --------------- | --------------- | ------------------------------------------------------ | -------------- |
| "文本输入框" / `input[type="text"]` | form-controls.json | `input` | `v.string()` | 基础字符串控件 |
| "密码框" / `input[type="password"]` | form-controls.json | `password` | `v.pipe(v.string(), setComponent('password'))` | 密码控件 |
| "邮箱输入框" / `input[type="email"]` | form-controls.json | `input` | `v.pipe(v.string(), v.email(), setComponent('email'))` | 邮箱控件 |
| "数字输入框" / `input[type="number"]` | form-controls.json | `input` | `v.number()` | 数字控件 |
| "日期选择器" / `input[type="date"]` | form-controls.json | `calendar` | `v.pipe(NFCSchema, setComponent('calendar'))` | 日期控件 |
| "下拉选择框" / `select` | form-controls.json | `select` | `v.pipe(v.string(), setComponent('select'))` | 下拉选择控件 |
| "多行文本框" / `textarea` | form-controls.json | `textarea` | `v.pipe(v.string(), setComponent('textarea'))` | 多行文本控件 |
| "按钮" / `button` | non-form-controls.json | `button` | `v.pipe(NFCSchema, setComponent('button'))` | 按钮组件 |

**组件查找流程**:

```typescript
// 示例 1: 查找已存在的组件
<input type="password" />
→ 查找 form-controls.json: name="password"
→ 找到组件: { "name": "password", "type": "表单控件组件" }
→ 生成 Schema: v.pipe(v.string(), setComponent('password'))

// 示例 2: 自然语言描述
"密码输入框"
→ 语义理解: password input
→ 查找 form-controls.json: name="password"
→ 找到组件: { "name": "password", "type": "表单控件组件" }
→ 生成 Schema: v.pipe(v.string(), setComponent('password'))

// 示例 3: 未知组件,语义化创建
"视频播放器"
→ 查找 non-form-controls.json: name="video" → 未找到
→ 语义化创建: setComponent('video-player')
→ 生成 Schema: v.pipe(NFCSchema, setComponent('video-player'))
```

### 第三步:属性转换

将描述中的属性转换为 Valibot Actions:

```typescript
// class 属性
class="w-full" → actions.class.component('w-full')
class="btn btn-primary" → actions.class.component('btn btn-primary')

// type 属性
type="password" → setComponent('password')
type="email" → v.pipe(v.string(), v.email(), setComponent('email'))

// placeholder 属性
placeholder="请输入用户名" → actions.attributes.patch({ placeholder: '请输入用户名' })

// text 内容
<button>登录</button> → actions.inputs.patch({ content: '登录' })

// color 属性
class="btn btn-primary" → actions.inputs.patch({ color: 'primary' })

// 必填标识
<span class="text-error">*</span> 或 "必填" → v.required()

// 邮箱格式
"邮箱" 或 type="email" → v.pipe(v.string(), v.email())

// 数字范围
"年龄(0-120)" → v.pipe(v.number(), v.minValue(0), v.maxValue(120))
```

### 第四步:布局容器识别

根据描述中的布局结构选择容器类型:

```typescript
// fieldset 容器
"字段集" / <fieldset> → v.pipe(v.object(), setComponent('fieldset'))

// div 容器
"垂直布局" / <div> → v.pipe(v.object(), setComponent('div'))

// card 容器
"卡片" / <div class="card"> → v.pipe(v.object(), setComponent('card'))

// 水平分组
"两列布局" / flex gap-2 → v.object({ row1: v.pipe(v.object(...), actions.class.component('flex gap-2')) })

// 表单组容器
"分组表单" → v.pipe(v.object(), setComponent('accordion')) / 'tabs' / 'steps'
```

### 第五步:包装器配置

根据描述中的标签和验证需求配置包装器:

```typescript
// 有标签文本
"用户名:" / <label> → actions.wrappers.set(['label-wrapper'])

// 需要验证提示
"必填" / <span class="text-error">*</span> → actions.wrappers.set(['validate-tooltip-wrapper'])

// 结合标签和验证
< label >用户名< span class="text-error">*</span></label> → actions.wrappers.set(['label-wrapper', 'validate-tooltip-wrapper'])
```

### 第六步:组件依赖声明

**重要**: 生成 Schema 时不需要考虑组件是否已存在,只需声明依赖:

```typescript
// 未知组件(如视频播放器)
"视频播放器,播放 movie.mp4"
→
v.pipe(
  NFCSchema,
  setComponent('video-player'),
  actions.inputs.patch({
    src: 'movie.mp4',
    controls: true,
  })
)
// 开发者稍后实现 video-player 组件

// 下拉选择列表(需要 options)
actions.inputs.patch({
  options: []  // 声明组件需要 options 属性
})
```

## 生成示例

### 示例 1: HTML 表单反向工程

**HTML 输入**:

```html
<fieldset class="fieldset">
  <legend class="fieldset-legend">用户信息</legend>
  <div class="flex flex-col">
    <label class="label">
      <span>用户名</span>
      <span class="text-error">*</span>
    </label>
    <input class="input w-full" type="text" placeholder="请输入用户名" />
  </div>
  <div class="flex flex-col">
    <label class="label">
      <span>邮箱</span>
    </label>
    <input class="input w-full" type="email" placeholder="请输入邮箱" />
  </div>
  <button class="btn btn-primary" type="button">登录</button>
</fieldset>
```

**生成 Schema**:

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';

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
      actions.inputs.patch({
        content: '登录',
        color: 'primary',
      }),
    ),
  }),
  setComponent('fieldset'),
);
```

### 示例 2: 自然语言描述

**自然语言输入**:

```
请创建一个用户注册表单:
- 用户名: 必填,带占位符"请输入用户名"
- 年龄: 数字输入,范围 18-60
- 性别: 下拉选择,选项包括"男"、"女"、"其他"
- 个人简介: 多行文本,带占位符"请输入个人简介"
- 注册按钮: 主色调
```

**生成 Schema**:

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';

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
      actions.inputs.patch({
        content: '注册',
        color: 'primary',
      }),
    ),
  }),
  setComponent('div'),
);
```

### 示例 3: UI 设计稿描述

**UI 描述输入**:

```
表单容器使用 fieldset,包含以下控件:
- 头部标题:"个人信息"
- 姓名输入框(左侧 50%)
- 电话输入框(右侧 50%)
- 性别选择器(单选按钮组)
- 地址文本域
- 底部按钮组:
  - 取消按钮
  - 确定按钮(主色调)
```

**生成 Schema**:

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';

export const ContactFormDefine = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('姓名'),
      actions.class.component('flex-1'),
    ),
    phone: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('电话'),
      actions.class.component('flex-1'),
    ),
    gender: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('性别'),
      actions.inputs.patch({
        options: [
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
        ],
      }),
    ),
    address: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('地址'),
    ),
    actions: v.pipe(
      v.object({
        cancel: v.pipe(
          NFCSchema,
          setComponent('button'),
          actions.inputs.patch({ content: '取消' }),
        ),
        submit: v.pipe(
          NFCSchema,
          setComponent('button'),
          actions.inputs.patch({ content: '确定', color: 'primary' }),
        ),
      }),
      actions.class.component('flex gap-2 justify-end mt-4'),
    ),
  }),
  setComponent('fieldset'),
);
```

### 示例 4: 现有表单迁移

**现有 Angular 表单**:

```typescript
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  rememberMe: [false],
  loginBtn: this.fb.group({}),
});
```

**生成 Schema**:

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';

export const LoginFormDefine = v.pipe(
  v.object({
    email: v.pipe(
      v.string(),
      v.email(),
      actions.wrappers.set(['label-wrapper']),
      v.title('邮箱'),
      v.required(),
    ),
    password: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('密码'),
      v.required(),
      v.minLength(6),
    ),
    rememberMe: v.pipe(
      v.boolean(),
      actions.wrappers.set(['label-wrapper']),
      v.title('记住我'),
    ),
    loginBtn: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({ content: '登录' }),
    ),
  }),
  setComponent('div'),
);
```

## 生成规则详解

### 1. 输入类型判断

```typescript
// HTML 片段
输入: `<input type="email" />`
判断: 包含 HTML 标签
处理: DOM 解析,元素类型识别

// 自然语言描述
输入: "邮箱输入框,带占位符"
判断: 无 HTML 标签,包含控件名称和属性
处理: 语义理解,实体识别

// UI 设计描述
输入: "两列布局,左侧姓名,右侧电话"
判断: 包含布局描述和控件安排
处理: 布局分析,组件映射

// 现有表单定义
输入: `email: new FormControl('', [Validators.email])`
判断: 包含表单框架语法
处理: 解析 FormGroup 结构,验证规则提取
```

### 2. 控件类型判断

```typescript
// 文本控件
描述关键词: "文本框" / "输入框" / "输入"
→ v.string()

// 密码控件
描述关键词: "密码" / "密码框" / "password"
→ v.pipe(v.string(), setComponent('password'))

// 邮箱控件
描述关键词: "邮箱" / "email" / "邮件"
→ v.pipe(v.string(), v.email())

// 数字控件
描述关键词: "数字" / "年龄" / "数量" / "price"
→ v.number()

// 日期控件
描述关键词: "日期" / "时间" / "date" / "calendar"
→ v.pipe(NFCSchema, setComponent('calendar'))

// 选择控件
描述关键词: "选择" / "下拉" / "单选" / "多选"
→ v.pipe(v.string() / v.array(), setComponent('select') / 'checkbox-list')

// 按钮控件
描述关键词: "按钮" / "submit" / "cancel" / "login"
→ v.pipe(NFCSchema, setComponent('button'))
```

### 3. 验证规则推断

```typescript
// 必填项
描述关键词: "必填" / "*" / "required"
→ v.required()

// 邮箱格式
描述关键词: "邮箱" / "email"
→ v.pipe(v.string(), v.email())

// 数字范围
描述关键词: "范围" / "min" / "max"
→ v.pipe(v.number(), v.minValue(), v.maxValue())

// 最小长度
描述关键词: "最少" / "最小" / "minLength"
→ v.pipe(v.string(), v.minLength())

// 最大长度
描述关键词: "最多" / "最大" / "maxLength"
→ v.pipe(v.string(), v.maxLength())

// 正则验证
描述关键词: "格式" / "正则" / "regex"
→ v.pipe(v.string(), v.regex())
```

### 4. 布局容器判断

```typescript
// fieldset 容器
描述关键词: "字段集" / "分组" / "<fieldset>"
→ v.pipe(v.object(), setComponent('fieldset'))

// div 容器
描述关键词: "垂直布局" / "容器" / "<div>"
→ v.pipe(v.object(), setComponent('div'))

// card 容器
描述关键词: "卡片" / "card"
→ v.pipe(v.object(), setComponent('card'))

// tabs 容器
描述关键词: "标签页" / "tabs" / "多标签"
→ v.pipe(v.object(), setComponent('tabs'))

// accordion 容器
描述关键词: "手风琴" / "折叠" / "accordion"
→ v.pipe(v.object(), setComponent('accordion'))

// steps 容器
描述关键词: "步骤" / "wizard" / "向导"
→ v.pipe(v.object(), setComponent('steps'))
```

## 常见问题

### Q1: 如何处理未知组件(如视频播放器)?

**A**: 未知组件的处理流程:

**步骤 1:先从 non-form-controls.json 查找**

```typescript
"视频播放器"
→ 查找 non-form-controls.json: name="video" → 未找到
```

**步骤 2:语义化创建组件**

```typescript
v.pipe(
  NFCSchema,
  setComponent('video-player'),
  actions.inputs.patch({
    src: 'movie.mp4',
    controls: true,
  }),
);
// 开发者稍后实现 video-player 组件
```

### Q2: 如何处理需要传入属性的组件?

**A**: 使用 `actions.inputs.patch()` 声明组件需要的属性:

```typescript
// 下拉选择需要 options
actions.inputs.patch({
  options: [], // 声明组件需要 options 属性
});

// 或使用 patchAsync 从上下文获取
actions.inputs.patchAsync({
  options: (field) => field.context?.['options$'],
});

// JSON 文件中定义的组件可能需要特定属性
// 例如:select 组件需要 options 和 optionConvert 属性
actions.inputs.patch({
  options: [], // 从 form-controls.json 中查询 select 组件的 requiredProps
});
```

### Q3: 生成 Schema 后,如何实现组件?

**A**: Schema 只是元数据定义,你需要手动创建组件:

```typescript
// 1. 创建 video-component 组件
@Component({
  selector: 'app-video-component',
  template: `<video [src]="src" [controls]="controls"></video>`,
})
export class VideoComponent {
  input.required<string>()
  controls = input(false)
}
```

### Q4: 如何处理复杂的布局?

**A**: 对于复杂的布局,可以使用 `v.object()` 创建分组,然后通过 CSS 类名控制布局。例如:

```typescript
v.pipe(
  v.object({
    row1: v.pipe(
      v.object({
        field1: v.string(),
        field2: v.string(),
      }),
      actions.class.component('flex gap-2'),
    ),
  }),
  setComponent('div'),
);
```

### Q5: HTML to form 和 Form Schema Generator 有什么区别?

**A**: 

| 特性 | HTML to form | Form Schema Generator |
|------|--------------|---------------------|
| 输入来源 | 仅 HTML 片段 | HTML、自然语言、UI 描述、现有表单定义 |
| 分析方式 | DOM 解析 | 语义理解 + DOM 解析 |
| 适用场景 | HTML 反向工程 | 多场景表单生成 |
| 复杂度 | 较低 | 较高 |

**何时使用哪个技能?**

- **HTML to form**: 当你有现成的 HTML 片段需要转换时
- **Form Schema Generator**: 当你有各种形式的描述,需要生成 Schema 时

## 使用建议

1. **明确输入类型**:先确定输入是 HTML、自然语言还是 UI 描述,选择对应的分析策略
2. **先查表再生成**:先从 [`references/form-controls.json`](./references/form-controls.json) 或其他对应的 JSON 文件查找已有组件,找不到再语义化创建
3. **详细描述需求**:自然语言描述时,尽量详细说明控件类型、属性、验证规则等
4. **声明未知组件**:对于未知组件,使用语义化命名 `setComponent('your-component')`
5. **声明所需属性**:对于未知属性,使用 `actions.inputs.patch({ prop: value })`
6. **验证生成结果**:生成 Schema 后运行测试,确保渲染正确
7. **逐步实现组件**:先生成 Schema,再手动实现组件
8. **包装器使用**:使用包装器添加标签、验证等周边功能

**输入类型识别流程图**:

```
输入描述
    ↓
包含 HTML 标签?
    ├─ 是 → HTML 分析策略
    │         ↓
    │       DOM 解析
    │
    └─ 否 → 检查是否是表单框架语法
              ├─ 是 → 现有表单分析策略
              │         ↓
              │       解析 FormGroup
              │
              └─ 否 → 自然语言/UI 分析策略
                        ↓
                      语义理解
```

**组件查找流程图**:

```
控件描述
    ↓
查找对应的 JSON 文件 (name)
    ├─ 表单控件 → form-controls.json
    ├─ 非表单控件 → non-form-controls.json
    ├─ 表单组控件 → form-groups.json
    └─ 包装器 → wrappers.json
    ↓
    ├─ 找到 → 使用预定义组件名
    │         ↓
    │       生成 Schema
    │
    └─ 未找到 → 语义化创建组件名
               ↓
             生成 Schema
```
