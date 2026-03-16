---
name: html-to-form
description: '**WORKFLOW SKILL** — 根据 HTML 片段反向生成 piying-view Valibot Schema 定义。作为架构设计工具，生成的是元数据定义而非完整实现。开发者自行实现组件和功能。USE FOR: HTML 反向工程生成 Schema、表单架构设计、组件定义骨架生成。DO NOT USE FOR: 组件实现；业务逻辑编写；运行时调试。INVOKES: file system tools (read/write schema files), ask-questions tool. FOR SINGLE OPERATIONS: 简单控件直接编辑文件即可。'
---

# HTML 到表单 (HTML to Form) 技能指南

## 角色定位

HTML to Form 是一个**架构设计工具**，而不是代码生成器。

它的核心任务是：**根据 HTML 片段反向设计 piying-view 的 Valibot Schema 定义**，生成的是元数据（metadata），而不是完整的实现。

### 设计哲学

| 角色                    | 职责                   | 示例                                        |
| ----------------------- | ---------------------- | ------------------------------------------- |
| **Schema 定义**（工具） | 设计架构，定义元数据   | `v.pipe(v.string(), setComponent('video'))` |
| **开发者**（你自己）    | 实现组件，处理业务逻辑 | 创建 `video-component` 组件                 |
| **piying-view**         | 解析 Schema，渲染 UI   | 根据定义渲染组件                            |

### 核心原则

1. **控件/组件负责显示**: 只定义需要什么组件，不关心组件怎么实现
2. **包装器负责加强**: 通过包装器添加标签、验证、样式等周边功能
3. **容器负责布局**: 通过容器组织结构，支持动态添加组件（如数组）
4. **先定义后实现**: 生成 Schema 定义，然后手动实现组件

### 适用场景

| 场景          | 描述                                     | 生成策略                     |
| ------------- | ---------------------------------------- | ---------------------------- |
| HTML 反向工程 | 有现有 HTML，需要创建 piying-view Schema | 分析 HTML 结构，推断控件类型 |
| 组件迁移      | 将现有 Angular 表单迁移到 piying-view    | 识别组件选择器，匹配控件定义 |
| 表单重构      | 重构现有表单，保留功能并使用 Schema      | 分析布局容器，生成分组结构   |
| 架构设计      | 设计新表单的架构                         | 定义组件依赖和数据结构       |

### 生成原则

1. **控件类型识别**:
   - 表单控件 → Valibot 验证器（如 `v.string()`, `v.number()`）
   - 非表单控件 → `NFCSchema` + `setComponent('组件名')`
   - **未知组件** → 直接定义 `setComponent('your-custom-component')`

2. **属性推断**:
   - `class="w-full"` → `actions.class.component('w-full')`
   - `placeholder="..."` → `actions.attributes.patch({ placeholder: '...' })`
   - **其他属性** → 语义化定义,比如需要一个列表数据`actions.inputs.patch({ options: [] })`

3. **布局容器**:
   - `<div class="flex flex-col">` → `v.object()` + `setComponent('div')`
   - `<fieldset>` → `v.object()` + `setComponent('fieldset')`
   - 分组类型 → `v.object({})` / `v.intersect([])` / `v.tuple([])`

4. **包装器识别**:
   - 普通组件是纯功能性组件，无装饰
   - 需要附加功能时，使用包装器（如 `label-wrapper`）

## 技能使用流程

### 第一步：HTML 分析

仔细分析 HTML 片段，识别以下要素：

```html
<!-- 分析要点 -->
<app-schema-view>
  <fieldset class="fieldset">
    <!-- 容器类型: fieldset -->
    <legend class="fieldset-legend"></legend>
    <!-- 标题 -->
    <div class="flex flex-col">
      <!-- 布局: flex-col -->
      <label class="label">
        <!-- 包装器: label-wrapper -->
        <span>用户名</span>
        <!-- 标签文本: v.title() -->
        <span class="text-error">*</span>
        <!-- 必填: v.required() -->
      </label>
      <input class="input w-full ng-untouched ng-pristine ng-valid" type="text" />
      <!-- 控件: input -->
    </div>
    <!-- ... 更多字段 -->
    <button class="btn btn-primary" type="button">登录</button>
    <!-- 非表单控件: button -->
  </fieldset>
</app-schema-view>
```

**识别清单**:

- [ ] 容器类型 (fieldset, div, etc.)
- [ ] 控件类型 (input, button, select, etc.)
- [ ] 包装器 (input, button, select, etc.)
- [ ] 布局结构 (flex, grid, etc.)
- [ ] 标签文本 (label text)
- [ ] CSS 类名 (w-full, btn-primary, etc.)
- [ ] HTML 属性 (placeholder, type, etc.)

### 第二步：控件类型映射

根据 HTML 元素类型生成对应的 Valibot Schema：
举例:
| HTML 元素 | Valibot Schema | 说明 |
| ------------------------- | ------------------------------------------------------ | -------------- |
| `<input type="text">` | `v.string()` | 基础字符串控件 |
| `<input type="password">` | `v.pipe(v.string(), setComponent('password'))` | 密码控件 |
| `<input type="email">` | `v.pipe(v.string(), v.email(), setComponent('email'))` | 邮箱控件 |
| `<button>` | `v.pipe(NFCSchema, setComponent('button'))` | 非表单控件 |
| `<select>` | `v.pipe(v.string(), setComponent('select'))` | 下拉选择控件 |
| `<textarea>` | `v.pipe(v.string(), setComponent('textarea'))` | 多行文本控件 |
| `<fieldset>` | `v.pipe(v.object(), setComponent('fieldset'))` | 分组容器 |

### 第三步：属性转换

将 HTML 属性转换为 Valibot Actions：

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
```

### 第四步：包装器配置

根据 HTML 结构确定包装器：

```typescript
// label 元素 → label-wrapper
<label class="label">
  <span>用户名</span>
</label>
→ actions.wrappers.set(['label-wrapper'])

// flex-col 布局 → 可能需要 label-wrapper
<div class="flex flex-col">...</div>
→ actions.wrappers.set(['label-wrapper'])

// fieldset 容器 → fieldset 组件
<fieldset class="fieldset">
→ v.pipe(v.object(), setComponent('fieldset'))
```

### 第五步：组件依赖声明

**重要**: 生成 Schema 时不需要考虑组件是否已存在，只需声明依赖：

```typescript
// 未知组件（如视频播放器）
<video class="w-full" src="movie.mp4" />
→
v.pipe(
  NFCSchema,
  setComponent('video-component'),
  actions.inputs.patch({
    src: 'movie.mp4',
    controls: true,
  })
)
// 开发者稍后实现 video-component 组件

// 下拉选择列表（需要 options）
actions.inputs.patch({
  options: []  // 声明组件需要 options 属性
})
```

## 生成示例

### 示例 1: 登录表单（表单控件 + 非表单控件）

\*\*HTML 输入:

```html
<fieldset class="fieldset">
  <legend class="fieldset-legend"></legend>
  <div class="flex flex-col">
    <label class="label">
      <span>用户名</span>
      <span class="text-error">*</span>
    </label>
    <input class="input w-full ng-untouched ng-pristine ng-valid" type="text" />
  </div>
  <div class="flex flex-col">
    <label class="label">
      <span>密码</span>
      <span class="text-error">*</span>
    </label>
    <input class="input w-full ng-untouched ng-pristine ng-valid" type="text" />
  </div>
  <button class="btn btn-primary" type="button">登录</button>
</fieldset>
```

**生成 Schema**:

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';

export const LoginDefine = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('用户名'),
      v.required(),
      actions.class.component('w-full'),
    ),
    password: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('密码'),
      v.required(),
      actions.class.component('w-full'),
    ),
    __button: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({
        content: '登录',
        color: 'primary',
      }),
      // 稍后由开发者实现 clicked 事件处理
    ),
  }),
  setComponent('fieldset'),
);
```

### 示例 2: 带有未知组件的表单（如视频播放器）

**HTML 输入**:

```html
<div class="flex flex-col">
  <label class="label">
    <span>邮箱</span>
  </label>
  <input class="input w-full" type="email" placeholder="请输入邮箱" />
</div>
<div class="flex flex-col">
  <label class="label">
    <span>描述</span>
  </label>
  <textarea class="textarea w-full" placeholder="请输入描述"></textarea>
</div>
```

**生成 Schema**:

```typescript
import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';

export const SimpleFormDefine = v.pipe(
  v.object({
    email: v.pipe(
      v.string(),
      v.email(),
      actions.wrappers.set(['label-wrapper']),
      v.title('邮箱'),
      actions.attributes.patch({ placeholder: '请输入邮箱' }),
      actions.class.component('w-full'),
    ),
    description: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('描述'),
      actions.attributes.patch({ placeholder: '请输入描述' }),
      actions.class.component('w-full'),
    ),
    videoPlayer: v.pipe(
      NFCSchema,
      setComponent('video-component'),
      actions.inputs.patch({
        src: 'movie.mp4',
        controls: true,
      }),
    ),
  }),
  setComponent('div'),
);
// 开发者稍后实现 video-component 组件
```

### 示例 3: 复杂布局（包含未知组件）

**HTML 输入**:

```html
<fieldset class="fieldset">
  <legend class="fieldset-legend">用户信息</legend>
  <div class="flex gap-2">
    <div class="flex flex-col flex-1">
      <label class="label">
        <span>姓名</span>
        <span class="text-error">*</span>
      </label>
      <input class="input w-full" type="text" placeholder="请输入姓名" />
    </div>
    <div class="flex flex-col flex-1">
      <label class="label">
        <span>年龄</span>
      </label>
      <input class="input w-full" type="number" placeholder="请输入年龄" />
    </div>
  </div>
  <div class="flex flex-col">
    <label class="label">
      <span>地址</span>
    </label>
    <textarea class="textarea w-full" placeholder="请输入地址"></textarea>
  </div>
  <button class="btn btn-primary mt-4" type="button">提交</button>
</fieldset>
```

**生成 Schema**:

```typescript
import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';

export const ComplexFormDefine = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('姓名'),
      v.required(),
      actions.attributes.patch({ placeholder: '请输入姓名' }),
      actions.class.component('w-full'),
    ),
    age: v.pipe(
      v.number(),
      actions.wrappers.set(['label-wrapper']),
      v.title('年龄'),
      actions.attributes.patch({ placeholder: '请输入年龄' }),
      actions.class.component('w-full'),
    ),
    address: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('地址'),
      actions.attributes.patch({ placeholder: '请输入地址' }),
      actions.class.component('w-full'),
    ),
    submit: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({
        content: '提交',
        color: 'primary',
      }),
      actions.class.component('mt-4'),
    ),
    // 未知组件声明
    videoPlayer: v.pipe(
      NFCSchema,
      setComponent('video-component'),
      actions.inputs.patch({
        src: 'intro.mp4',
      }),
    ),
  }),
  setComponent('fieldset'),
);
// 开发者稍后实现 video-component 组件
```

## 生成规则详解

### 1. 容器类型判断

```typescript
// fieldset 容器
<fieldset class="fieldset">...</fieldset>
→ v.pipe(v.object(), setComponent('fieldset'))

// div 容器
<div class="flex flex-col">...</div>
→ v.pipe(v.object(), setComponent('div'))

// card 容器
<div class="card">...</div>
→ v.pipe(v.object(), setComponent('card'))
```

### 2. 控件类型判断（包括未知组件）

```typescript
// 已知控件
<input type="text" />
→ v.string()

// 未知组件（如视频播放器）
<video src="movie.mp4" />
→ v.pipe(
  NFCSchema,
  setComponent('video-component'),
  actions.inputs.patch({ src: 'movie.mp4' })
)
// 开发者稍后实现 video-component 组件

// 表单控件
<input type="password" />
→ v.pipe(v.string(), setComponent('password'))

// 非表单控件
<button type="button"></button>
→ v.pipe(NFCSchema, setComponent('button'))
```

### 3. 包装器判断

```typescript
// label 元素
<label class="label">
  <span>标签文本</span>
</label>
→ actions.wrappers.set(['label-wrapper'])

// 有 label 元素的 div
<div class="flex flex-col">
  <label>...</label>
  <input />
</div>
→ actions.wrappers.set(['label-wrapper'])
```

### 4. 验证规则推断

```typescript
// 必填项
<span class="text-error">*</span>
→ v.required()

// email 类型
<input type="email" />
→ v.pipe(v.string(), v.email())

// number 类型
<input type="number" />
→ v.number()

// 最小长度
<input minlength="3" />
→ v.pipe(v.string(), v.minLength(3))

// 最大长度
<input maxlength="20" />
→ v.pipe(v.string(), v.maxLength(20))
```

## 常见问题

### Q1: 如何处理未知组件（如视频播放器）？

**A**: 直接声明组件依赖，不需要组件已存在：

```typescript
v.pipe(
  NFCSchema,
  setComponent('video-component'),
  actions.inputs.patch({
    src: 'movie.mp4',
    controls: true,
  }),
);
// 开发者稍后实现 video-component 组件
```

### Q2: 如何处理需要传入属性的组件？

**A**: 使用 `actions.inputs.patch()` 声明组件需要的属性：

```typescript
// 下拉选择需要 options
actions.inputs.patch({
  options: [], // 声明组件需要 options 属性
});

// 或使用 patchAsync 从上下文获取
actions.inputs.patchAsync({
  options: (field) => field.context?.['options$'],
});
```

### Q3: 生成 Schema 后，如何实现组件？

**A**: Schema 只是元数据定义，你需要手动创建组件：

```typescript
// 1. 创建 video-component 组件
@Component({
  selector: 'app-video-component',
  template: `<video [src]="src" [controls]="controls"></video>`,
})
export class VideoComponent {
  input.required<string>()
  controls=input(false)
}


```

### Q4: 如何处理复杂的布局？

**A**: 对于复杂的布局，可以使用 `v.object()` 创建分组，然后通过 CSS 类名控制布局。例如：

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

## 使用建议

1. **先分析再生成**: 仔细分析 HTML 结构，确保准确识别控件类型
2. **声明未知组件**: 对于未知组件，直接声明 `setComponent('your-component')`
3. **声明所需属性**: 对于未知属性，使用 `actions.inputs.patch({ prop: value })`
4. **验证生成结果**: 生成 Schema 后运行测试，确保渲染正确
5. **逐步实现组件**: 先生成 Schema，再手动实现组件
6. **包装器使用**: 使用包装器添加标签、验证等周边功能
