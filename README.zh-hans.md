# 安装指南

## 前提条件

您需要有一个现有的 Angular 项目。

## 步骤

### 1. 安装 @piying-lib/angular-daisyui 及其对等依赖

安装主包和必要的对等依赖：

```bash
npm i @piying-lib/angular-daisyui
```

如果尚未安装以下对等依赖，请运行对应命令：

```bash
npm i @piying/view-angular@^2.7.1
npm i daisyui@^5.5.19
npm i @angular/cdk@>=20.0.0
npm i @angular/material@>=20.0.0
npm i @cyia/ngx-common@>=20.0.4
```

### 2. 安装 Tailwind CSS（如果不存在）

如果您的项目尚未安装 Tailwind CSS，请按照 [Tailwind CSS Angular 指南](https://tailwindcss.com/docs/installation/framework-guides/angular) 进行安装。

执行以下命令：

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

编辑 `.postcssrc.json` 文件：

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### 3. 安装 DaisyUI（如果不存在）

如果您的项目尚未安装 DaisyUI，请按照 [DaisyUI 安装指南](https://daisyui.com/docs/install/) 进行安装。

执行以下命令：

```bash
npm i -D daisyui@latest
```

### 4. 配置 CSS

在您的主 CSS 文件（例如 `src/styles.css` 或 `src/styles.scss`）中添加以下配置：

```css
@import 'tailwindcss';

@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
}

@source '../node_modules/@piying-lib/angular-daisyui/fesm2022';
@source '../node_modules/@piying-lib/angular-daisyui/preset-css/ts';
```

### 5. 配置应用

在 `src/app/app.config.ts` 中添加以下内容：

```diff
  import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZonelessChangeDetection,
  } from '@angular/core';
  import { provideRouter } from '@angular/router';

  import { routes } from './app.routes';
+   import { ThemeService } from '@piying-lib/angular-daisyui/service';
  import { provideHttpClient, withFetch } from '@angular/common/http';

  export const appConfig: ApplicationConfig = {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes),
      provideHttpClient(withFetch()),
+     ThemeService,
    ],
  };
```

## 快速开始

### 1. 导入预定义组件

通过预定义导出所有组件（也可以手动配置使用部分组件）：

```typescript
import { typedComponent } from '@piying/view-angular';
import { PresetDefine } from '@piying-lib/angular-daisyui/preset';

const safeDefine = typedComponent(PresetDefine);
export const FieldGlobalConfig = safeDefine.define;
```

### 2. 在路由中使用 SchemaViewPage

直接通过路由解析定义：

```typescript
import { SchemaViewPage } from '@piying-lib/angular-core';
import * as v from 'valibot';

export const routes: Routes = [
  {
    path: 'hello',
    component: SchemaViewPage,
    data: {
      // Valibot schema 定义
      schema: () => v.object({
        l1: v.pipe(v.string()),
      }),
      // 相关配置
      options: () => ({
        fieldGlobalConfig: FieldGlobalConfig,
      }),
      // 值
      model: () => ({
        l1: '12345',
      }),
    },
  },
];
```

## 完成

按照以上步骤操作后，您的 Angular 项目应该已经成功集成了 @piying-lib/angular-daisyui。