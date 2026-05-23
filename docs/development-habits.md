# Piying Angular Component 开发习惯与最佳实践

本文档总结了 `projects/core` 和 `projects/daisyui` 中所有组件和代码的开发习惯、模式和实践，供后续开发参考。

## 目录

1. [项目结构](#项目结构)
2. [组件分类体系](#组件分类体系)
3. [组件命名规范](#组件命名规范)
4. [基类使用模式](#基类使用模式)
5. [信号与状态管理](#信号与状态管理)
6. [样式与主题控制](#样式与主题控制)
7. [表单控件模式](#表单控件模式)
8. [模板与视图模式](#模板与视图模式)
9. [依赖注入与服务](#依赖注入与服务)
10. [工具函数与管道](#工具函数与管道)
11. [文档注释规范](#文档注释规范)
12. [版本管理](#版本管理)

---

## 项目结构

### 核心模块 (`projects/core`)

- **定位**: 提供核心功能、类型定义、基类和通用组件
- **文件规模**: ~21 个非测试 TypeScript 文件
- **主要目录**:
  - `component/` - 核心组件（SchemaViewPage、StrTemplate）
  - `directive/` - 指令（Overlay、MenuTrigger）
  - `pipe/` - 管道
  - `util/` - 工具函数和类型定义
  - `wrapper/` - 包装器组件

### DaisyUI 主题模块 (`projects/daisyui`)

- **定位**: 基于 DaisyUI 主题的 UI 组件库
- **文件规模**: ~261 个非测试 TypeScript 文件
- **主要目录**:
  - `field-control/` - 表单控件（输入框、选择器等）
  - `field-group/` - 表单分组容器（标签页、手风琴等）
  - `non-field-control/` - 非表单控件（按钮、徽章等）
  - `extension/` - 扩展组件（表格、分页器等复杂组件）
  - `wrapper/` - 包装器组件（标签包装器、表单包装器等）
  - `overlay/` - 覆盖层组件（对话框、确认框等）
  - `service/` - 服务
  - `pipe/` - 主题相关管道

### 导出策略

```typescript
// projects/core/index.ts
export * from './util';
export * from './component';
export * from './wrapper';
export * from './pipe';
export * from './navigation.types';
export * from './directive/overlay';
export * from './directive/menu-trigger';
```

- 使用通配符导出整个模块
- 每个子目录有独立的 `index.ts`，只导出 `component.ts`

---

## 组件分类体系

### 1. 表单控件 (Field Control - FCC)

**特征**: 
- 继承 `BaseControl`
- 实现 `NG_VALUE_ACCESSOR`（21/261 文件）
- 提供数据输入功能
- 位于 `projects/daisyui/field-control/`

**示例组件**:
- `InputFCC` - 文本输入控件
- `SelectFCC` - 选择器控件
- `CheckboxFCC` - 复选框
- `RadioFCC` - 单选按钮
- `CalendarFCC` - 日期选择器
- `ToggleFCC` - 开关

### 2. 表单分组 (Field Group - FGC)

**特征**:
- 继承 `PiyingViewGroupBase`
- 包含多个子字段
- 用于组织和管理字段布局
- 位于 `projects/daisyui/field-group/`

**示例组件**:
- `TabsFGC` - 标签页组
- `AccordionFGC` - 手风琴折叠面板
- `DrawerFGC` - 抽屉
- `CarouselFGC` - 轮播图

### 3. 非表单控件 (Non-Field Control)

**特征**:
- 不继承基类（或自定义基类）
- 提供展示性功能
- 位于 `projects/daisyui/non-field-control/`

**示例组件**:
- `ButtonNC` - 按钮
- `BadgeNC` - 徽章
- `AlertNC` - 提示框
- `AvatarNC` - 头像

### 4. 扩展组件 (Extension)

**特征**:
- 复杂功能组件
- 通常结合多个基类或自定义实现
- 位于 `projects/daisyui/extension/`

**示例组件**:
- `EditableRowFGC` - 可编辑行
- `EditableGroupFGC` - 可编辑组
- `Table` - 数据表格（包含多个子组件和服务）
- `Pagination` - 分页器
- `OptionList` - 选项列表

### 5. 包装器 (Wrapper - WC)

**特征**:
- 围绕其他组件提供额外功能
- 通常处理样式、布局、验证状态
- 位于 `projects/daisyui/wrapper/`

**示例组件**:
- `LabelWC` - 标签包装器
- `FormWC` - 表单包装器
- `ValidateStatusWC` - 验证状态显示
- `TooltipWC` - 提示框包装器

---

## 组件命名规范

### 类名后缀

| 后缀 | 全称 | 用途 | 示例 |
|------|------|------|------|
| `FCC` | Field Control Component | 表单控件 | `InputFCC`, `SelectFCC` |
| `FGC` | Field Group Component | 表单分组 | `TabsFGC`, `AccordionFGC` |
| `WC` | Wrapper Component | 包装器 | `LabelWC`, `FormWC` |
| `NC` | Non-Field Control | 非表单控件 | `ButtonNC`, `BadgeNC` |

### 选择器命名

- 统一使用 `app-` 前缀
- 格式: `app-{组件名}`
- 示例: `app-input`, `app-select`, `app-tabs`

### 文件组织

```
field-control/
  input/
    component.ts  # 组件实现
    index.ts      # 导出语句
```

**约定**:
- 每个组件一个目录
- 主组件文件命名为 `component.ts`
- `index.ts` 只包含 `export * from './component'`
- 复杂组件可包含子目录（如 `wrapper/`, `util/`）

---

## 基类使用模式

### BaseControl

**来源**: `@piying/view-angular`

**适用场景**: 表单控件（FCC）

**核心功能**:
- 实现 `ControlValueAccessor` 接口
- 提供 `value$()` 信号获取当前值
- 提供 `valueChange()` 方法触发值变化
- 提供 `touchedChange()` 方法标记为已触碰
- 提供 `disabled$()` 信号获取禁用状态

**使用示例**:

```typescript
@Component({
  // ...
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFCC),
      multi: true,
    },
  ],
})
export class InputFCC extends BaseControl {
  valueChange2(value: any, el: HTMLInputElement) {
    switch (this.type()) {
      case 'number':
        this.valueChange(el.valueAsNumber);
        break;
      case 'date':
        this.valueChange(el.valueAsDate);
        break;
      default:
        this.valueChange(value);
    }
  }
}
```

### PiyingViewGroupBase

**来源**: `@piying/view-angular`

**适用场景**: 表单分组容器（FGC）

**核心功能**:
- 提供 `field$$()` 信号获取字段信息
- 管理子字段嵌套关系
- 支持动态内容渲染
- 提供 `PI_INPUT_OPTIONS_TOKEN` 注入

**使用示例**:

```typescript
@Component({
  // ...
})
export class TabsFGC extends PiyingViewGroupBase {
  constructor() {
    super();
    effect(() => {
      const control = this.field$$().form.control;
      // 处理字段逻辑
    });
  }
}
```

### 混合使用

复杂组件可能同时使用多个依赖：

```typescript
import { PiyingViewGroupBase } from '@piying/view-angular';
import { FieldLogicGroup } from '@piying/view-angular-core';

@Component({})
export class TabsFGC extends PiyingViewGroupBase {
  isUnion$$ = computed(() => {
    return (
      this.field$$().form.control instanceof FieldLogicGroup &&
      (this.field$$().form.control as FieldLogicGroup).type() === 'or'
    );
  });
}
```

---

## 信号与状态管理

### Input 属性

**使用 `input()` 函数定义输入属性（53/261 文件）**:

```typescript
// 基本输入
type = input<'text' | 'password' | 'number'>('text');
disableAdd = input(false);
minLength = input<number>(0);

// 带变换器的输入
options = input<CommonSelectOptions, CommonSelectOptions | undefined>([], {
  transform: (input) => input ?? [],
});

optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
  transform: (input) => ({ ...DefaultOptionConvert, ...input }),
});
```

**最佳实践**:
- 提供默认值
- 使用泛型明确类型
- 对可能为 null/undefined 的值使用变换器
- 合并默认配置时使用展开运算符

### Computed 信号

**广泛使用 `computed()`（73/261 文件）**:

```typescript
// 样式类计算
wrapperClass$$ = computed(() => {
  return this.#theme.setClass(
    this.#theme.setColor('input', this.color()),
    this.#theme.setSize('input', this.size()),
    this.ghost() ? this.#theme.addPrefix(`input-ghost`) : undefined,
  );
});

// 派生状态
isEnd$$ = computed(() => {
  const direction = this.labelPosition$$();
  return direction === 'bottom' || direction === 'end';
});

layout$$ = computed(() => {
  const direction = this.labelPosition$$();
  return direction === 'top' || direction === 'bottom' ? 'flex flex-col' : 'flex';
});
```

**命名约定**:
- Computed 信号以 `$$` 后缀结尾（如 `wrapperClass$$`, `isEnd$$`）
- 表示这是一个信号值，区别于普通变量

### Linked Signal

**使用 `linkedSignal()` 链接输入与状态（7/261 文件）**:

```typescript
activatedIndex$ = linkedSignal(this.activatedIndex, { equal: () => false });
```

**用途**: 允许跟踪值的变化历史，即使值相同也触发更新

### Effect

**谨慎使用 `effect()`（3/261 文件）**:

```typescript
constructor() {
  super();
  effect(() => {
    if (this.isUnion$$()) {
      const index = this.activatedIndex$();
      const control = this.field$$().form.control as FieldLogicGroup;
      control.activateIndex$.set(index);
    }
  });
}
```

**使用场景**: 需要在信号变化时执行副作用操作（如同步到外部系统）

### Private Signal 字段

**使用 `#` 私有字段存储服务注入**:

```typescript
#theme = inject(ThemeService);
#parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
```

---

## 样式与主题控制

### ThemeService

**核心服务** (`projects/daisyui/service/theme.service.ts`):

```typescript
@Injectable()
export class ThemeService {
  #prefix = inject(CSSClassPrefixToken, { optional: true }) ?? '';
  
  // 设置颜色类名
  setColor<T extends HasColorCmp>(cmpPrefix: T, input: Color | undefined): string | void
  
  // 设置尺寸类名
  setSize(cmpPrefix: SizeType, input: Size | undefined): string | void
  
  // 添加 CSS 前缀
  addPrefix(str: string): string
  
  // 添加 Tailwind 前缀
  addTwPrefix(str: string): string
  
  // 合并多个类名
  setClass(...args: (string | undefined)[]): string
}
```

### 样式类组合模式

**使用 `wrapperClass$$` 计算最终样式**:

```typescript
wrapperClass$$ = computed(() => {
  return this.#theme.setClass(
    this.#theme.setColor('input', this.color()),      // primary input
    this.#theme.setSize('input', this.size()),         // input-sm
    this.ghost() ? this.#theme.addPrefix('input-ghost') : undefined,
    this.native() ? this.#theme.addTwPrefix('appearance-none') : undefined,
  );
});
```

### 默认值获取

**使用 `useTwClass()` 和 `useDefaultClass()` 工具函数**:

```typescript
import { useTwClass } from '@piying-lib/angular-daisyui/service';

// input 属性使用默认 Tailwind 类
tabContentClass = input(useTwClass('bg-base-100 border-base-300 p-6'));
childClass = input(useTwClass('bg-base-100 border border-base-300'));
actionsClass = input(useTwClass('justify-end'));
```

### 管道系统

**自定义管道**:

1. **CssPrefixPipe** - 为 CSS 类名添加前缀
2. **TwPrefixPipe** - 为 Tailwind 类名添加前缀
3. **MergeClassPipe** - 合并多个类名（在模板中使用）

**模板中的使用**:

```html
<input
  [class]="
    attr()?.class 
      | mergeClass: ('input' | cssPrefix) 
      : wrapperClass$$() 
      : ('w-full' | twPrefix)
  "
/>
```

**链式管道调用**: `('input' | cssPrefix)` 先添加前缀再传递给下一个管道

---

## 表单控件模式

### ControlValueAccessor 实现

**标准模式** (21 个组件):

```typescript
@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFCC),
      multi: true,
    },
  ],
})
export class InputFCC extends BaseControl {
  // 继承 BaseControl 提供的方法:
  // - value$() -> Signal<any>
  // - valueChange(value) -> void
  // - touchedChange() -> void
  // - disabled$() -> Signal<boolean>
}
```

### 值变化处理

**类型特定的值转换**:

```typescript
valueChange2(value: any, el: HTMLInputElement) {
  switch (this.type()) {
    case 'number':
      this.valueChange(el.valueAsNumber);
      break;
    case 'date':
      this.valueChange(el.valueAsDate);
      break;
    default:
      this.valueChange(value);
  }
}
```

**触碰标记**:
- 使用 `touchedChange()` 在 blur 事件时调用
- 复杂控件使用 `valueAndTouchedChange()` 同时更新值和触碰状态

### Options 转换

**统一的选项处理工具** (`projects/core/util/options.ts`):

```typescript
export interface OptionConvert {
  label: (input: any) => string;
  description: (input: any) => string;
  value: (input: any) => any;
  isGroup: (input: any) => boolean;
  children?: (input: any) => any[];
  disabled?: (input: any) => boolean;
}

export const DefaultOptionConvert: OptionConvert = { /* ... */ };

export function transformOptions(options: any[], optionConvert: OptionConvert): ResolvedOption[]
```

**使用示例**:

```typescript
options = input<CommonSelectOptions, CommonSelectOptions | undefined>([], {
  transform: (input) => input ?? [],
});

optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
  transform: (input) => ({ ...DefaultOptionConvert, ...input }),
});

resolvedOptions$$ = computed(() => 
  transformOptions(this.options(), this.optionConvert())
);
```

---

## 模板与视图模式

### 模板引用

**使用 `viewChild.required()`** (72/261 文件):

```typescript
templateRef = viewChild.required('templateRef');
```

**配合 `<ng-template>` 使用**:

```html
<ng-template #templateRef let-attr="attributes">
  <!-- 内容 -->
</ng-template>
```

### 条件渲染

**使用 Angular 原生控制流**:

```html
@if (title && !isEnd) {
  <span>{{ title }}</span>
}

@for (item of items; track item.value) {
  <div>{{ item.label }}</div>
}
```

### Let 语句

**使用 `@let` 简化模板变量**:

```html
<ng-template #templateRef let-attr="attributes">
  @let title = props$$()['title'];
  @let isEnd = isEnd$$();
  
  <!-- 使用 title 和 isEnd -->
</ng-template>
```

### Template Outlet

**使用 `*ngTemplateOutlet` 渲染模板**:

```html
<ng-container *ngTemplateOutlet="requiredTemplate"></ng-container>
```

或使用 `SelectorlessOutlet` 指令:

```html
<ng-container insertField></ng-container>
```

### Host 绑定

**在 `host` 对象中定义宿主绑定**:

```typescript
@Component({
  host: {
    class: 'block',
    '[id]': 'id',
  },
})
```

**不使用 `@HostBinding` 和 `@HostListener` 装饰器**

---

## 依赖注入与服务

### Inject 函数

**使用 `inject()` 代替构造函数注入**:

```typescript
#theme = inject(ThemeService);
#route = inject(ActivatedRoute);
#injector = inject(Injector);
field$$ = inject(PI_VIEW_FIELD_TOKEN);
```

**可选注入**:

```typescript
parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
```

### 服务定义

**使用 `@Injectable()` 装饰器**:

```typescript
@Injectable()
export class ThemeService {
  readonly #prefix = inject(CSSClassPrefixToken, { optional: true }) ?? '';
}
```

**Service 位置**:
- 主题相关: `projects/daisyui/service/`
- 业务服务: 放在对应组件同级或 `service/` 目录

### Token 注入

**使用自定义 Token 获取配置**:

```typescript
parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
```

---

## 工具函数与管道

### 核心工具函数

**1. computedWithPrev** (`projects/core/util/computed-with-prev.ts`):

```typescript
export function computedWithPrev<T>(
  computation: (prev: T | undefined) => T,
  options?: CreateComputedOptions<T>,
): Signal<T>
```

**用途**: 创建可以访问前一个值的 computed signal

**2. Type Guards** (`projects/core/util/is.ts`):

```typescript
export function isSchema(input: any) {
  return (
    input && typeof input === 'object' && '~run' in input && 'kind' in input && 'type' in input
  );
}
```

**3. 类型定义** (`projects/core/util/type.ts`):

```typescript
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {});
export type Color = 'neutral' | 'primary' | 'secondary' | ... | (string & {});

export interface IconConfig {
  fontIcon?: string;
  fontSet?: string;
  svgIcon?: string;
  inline?: boolean;
}
```

### 管道使用模式

**在 `imports` 中注册管道**:

```typescript
@Component({
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe, PurePipe],
})
```

**模板中使用管道**:

```html
[ngModel]="inputFormat | pure: value$() : type()"
[class]="someValue | cssPrefix | mergeClass: otherClass"
```

---

## 文档注释规范

### JSDoc 注释格式

**组件级注释**:

```typescript
/**
 * 文本输入控件
 *
 * 提供多种类型的文本输入功能，支持文本、密码、数字、日期等常见输入场景。
 * 适合作为表单中的基础输入组件使用。
 */
@Component({})
export class InputFCC extends BaseControl { }
```

**扩展组件注释**:

```typescript
/*
 * EditableRowFGC - 可编辑行组件
 *
 * 用途: 用于动态管理表格风格的行数据，支持每行的增删改操作
 * 特性:
 *   - 表格布局展示，带有表头
 *   - 支持添加和删除行
 *   - 支持自定义操作按钮（编辑/删除）
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 需要以表格形式展示和编辑动态数据行的场景
 */
@Component({})
export class EditableRowFGC extends PiyingViewGroupBase { }
```

**属性注释**:

```typescript
/** 输入框类型 */
type = input<'text' | 'password'>('text');

/** 是否使用幽灵样式 */
ghost = input<boolean>();

/** 颜色主题 */
color = input<Color>();
```

---

## 版本管理

### 静态版本号

**所有组件都定义 `static __version = 2`**:

```typescript
export class InputFCC extends BaseControl {
  static __version = 2;
  // ...
}
```

**用途**: 
- 追踪组件 Schema 版本
- 向前/向后兼容性管理
- 统一为版本 2（表明项目已标准化）

---

## 关键依赖关系

### 内部依赖

```
@piying/view-angular (core) <- @piying-lib/angular-daisyui (daisyui)
         ^                           |
         |                           |
         +-----------<---------------+
```

### 外部依赖

- **Angular 核心**: `@angular/core`, `@angular/common`, `@angular/forms`
- **Angular CDK/Material**: `@angular/cdk`, `@angular/material`
- **工具库**: `clsx` (类名合并), `es-toolkit` (工具函数), `valibot` (验证)
- **共享库**: `@cyia/ngx-common` (通用指令和管道)
- **Piying View**: `@piying/view-angular` (核心表单系统), `@piying/view-angular-core` (核心类型和动作)

---

## 变更检测策略

### OnPush 使用

**9/261 个组件显式设置 `ChangeDetectionStrategy.OnPush`**:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelWC { }
```

**说明**:
- 大部分组件依赖信号的可变性自动触发变更检测
- OnPush 用于优化特定组件的性能
- 使用信号（Signal）的组件通常不需要额外的变更检测优化

---

## 开发检查清单

创建新组件时，请确保:

### 基础结构
- [ ] 创建独立的组件目录
- [ ] 包含 `component.ts` 和 `index.ts`
- [ ] 添加 `static __version = 2`
- [ ] 编写 JSDoc 注释（用途、特性、使用场景）

### 表单控件 (FCC)
- [ ] 继承 `BaseControl`
- [ ] 配置 `NG_VALUE_ACCESSOR` provider
- [ ] 使用 `input()` 定义输入属性
- [ ] 使用 `computed()` 派生状态
- [ ] 实现值变化处理逻辑

### 表单分组 (FGC)
- [ ] 继承 `PiyingViewGroupBase`
- [ ] 注入 `PI_VIEW_FIELD_TOKEN`
- [ ] 处理子字段逻辑
- [ ] 使用 `field$$()` 获取字段信息

### 样式控制
- [ ] 定义 `wrapperClass$$` 计算属性
- [ ] 使用 `ThemeService` 设置颜色和尺寸
- [ ] 模板中使用管道组合类名

### 模板
- [ ] 使用 `viewChild.required()` 引用模板
- [ ] 使用原生控制流 (`@if`, `@for`)
- [ ] 使用 `@let` 简化变量
- [ ] 在 `host` 中定义宿主绑定

### 代码质量
- [ ] 使用 `inject()` 代替构造函数注入
- [ ] Computed 信号以 `$$` 结尾
- [ ] Private 字段使用 `#` 前缀
- [ ] 遵循现有命名约定 (FCC/FGC/WC/NC)

---

## 统计概览

| 指标 | 数值 |
|------|------|
| DaisyUI 组件总数 | ~97 个 `@Component`/`@Directive`/`@Injectable` |
| 使用 `input()` 的组件 | 53 个 |
| 使用 `computed()` 的组件 | 73 个 |
| 使用 `viewChild.required()` 的组件 | 72 个 |
| 实现 `NG_VALUE_ACCESSOR` 的组件 | 21 个 |
| 使用 `linkedSignal()` 的组件 | 7 个 |
| 使用 `effect()` 的组件 | 3 个 |
| 显式设置 OnPush 的组件 | 9 个 |
| 有 JSDoc 注释的 field-control | 18 个 |

---

## 总结

这个项目展现了一套成熟的 Angular 组件开发模式，核心特点包括:

1. **信号优先**: 全面使用 Angular Signals 进行状态管理
2. **基类抽象**: 通过 `BaseControl` 和 `PiyingViewGroupBase` 提供统一的继承体系
3. **主题系统**: 通过 `ThemeService` 实现统一的主题和样式控制
4. **类型安全**: 严格的 TypeScript 类型定义和泛型使用
5. **版本管理**: 统一的 `__version` 确保 Schema 兼容性
6. **文档完善**: JSDoc 注释覆盖主要组件和使用场景

遵循这些模式和实践可以确保代码的一致性、可维护性和可扩展性。
