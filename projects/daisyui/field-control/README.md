# Field Control 组件库

Field Control 组件库提供了各种表单输入控件，基于 DaisyUI 样式系统构建，支持 Angular 响应式表单。

## 组件列表

| 组件 | 说明 | 适用场景 |
|------|------|----------|
| `app-input` | 文本输入控件 | 文本、密码、数字、日期等常见输入 |
| `app-checkbox` | 复选框控件 | 多选、功能启用/禁用 |
| `app-radio` | 单选框控件 | 单选、选项互斥选择 |
| `app-select` | 选择器控件 | 下拉选择、多选、原生样式 |
| `app-textarea` | 多行文本控件 | 评论、描述、备注等长文本输入 |
| `app-password` | 密码输入控件 | 密码输入、敏感信息输入 |
| `app-range` | 范围选择控件 | 滑动条、数值范围选择 |
| `app-rating` | 评分控件 | 星级评分、评价系统 |
| `app-calendar` | 日期选择控件 | 日期、多选、范围选择 |
| `app-toggle` | 开关控件 | 开/关状态切换 |
| `app-swap` | 交换控件 | 两种或三种状态切换 |
| `app-file-input` | 文件上传控件 | 单文件、多文件上传 |
| `app-editable-badge` | 可编辑标签控件 | 内联编辑、自定义标签 |

## 使用示例

```typescript
import { InputFCC, CheckboxFCC, SelectFCC } from '@piying-lib/angular-daisyui/field-control';

// 在模块中导入所需的控件
@NgModule({
  imports: [InputFCC, CheckboxFCC, SelectFCC]
})
export class AppModule {}
```

## 共同属性

所有控件都支持以下属性：

- `color`: 设置控件颜色
- `size`: 设置控件尺寸
- `ghost`: 是否使用幽灵样式（部分控件支持）

## 与表单集成

所有控件都实现了 `ControlValueAccessor` 接口，可直接与 Angular 响应式表单集成：

```typescript
// 表单模型
this.form = this.fb.group({
  name: ['', Validators.required],
  age: [18],
  gender: ['male'],
  description: [''],
});

// 模板使用
<app-input formControlName="name"></app-input>
<app-radio formControlName="gender" [options]="genderOptions"></app-radio>
<app-textarea formControlName="description"></app-textarea>
```
