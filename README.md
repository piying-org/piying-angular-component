# Installation Guide

## Prerequisites

You need to have an existing Angular project.

## Steps

### 1. Install @piying-lib/angular-daisyui and Peer Dependencies

Install the main package and necessary peer dependencies:

```bash
npm i @piying-lib/angular-daisyui
```

If the following peer dependencies are not already installed, run the corresponding commands:

```bash
npm i @piying/view-angular@^2.7.1
npm i daisyui@^5.5.19
npm i @angular/cdk@>=20.0.0
npm i @angular/material@>=20.0.0
npm i @cyia/ngx-common@>=20.0.4
```

### 2. Install Tailwind CSS (if not present)

If Tailwind CSS is not already installed in your project, follow the [Tailwind CSS Angular guide](https://tailwindcss.com/docs/installation/framework-guides/angular).

Run the following command:

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

Edit the `.postcssrc.json` file:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

### 3. Install DaisyUI (if not present)

If DaisyUI is not already installed in your project, follow the [DaisyUI installation guide](https://daisyui.com/docs/install/).

Run the following command:

```bash
npm i -D daisyui@latest
```

### 4. Configure CSS

Add the following configuration to your main CSS file (e.g., `src/styles.css` or `src/styles.scss`):

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

### 5. Configure the Application

Add the following to `src/app/app.config.ts`:

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

## Quick Start

### 1. Import Preset Components

Import all components from the preset (or manually configure to use specific components):

```typescript
import { typedComponent } from '@piying/view-angular';
import { PresetDefine } from '@piying-lib/angular-daisyui/preset';

const safeDefine = typedComponent(PresetDefine);
export const FieldGlobalConfig = safeDefine.define;
```

### 2. Use SchemaViewPage in Routes

Directly resolve definitions through routing:

```typescript
import { SchemaViewPage } from '@piying-lib/angular-core';
import * as v from 'valibot';

export const routes: Routes = [
  {
    path: 'hello',
    component: SchemaViewPage,
    data: {
      // Valibot schema definition
      schema: () => v.object({
        l1: v.pipe(v.string()),
      }),
      // Configuration options
      options: () => ({
        fieldGlobalConfig: FieldGlobalConfig,
      }),
      // Model value
      model: () => ({
        l1: '12345',
      }),
    },
  },
];
```

