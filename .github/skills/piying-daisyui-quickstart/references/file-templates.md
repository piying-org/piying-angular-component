# 文件配置模板参考

## .postcssrc.json

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

## src/styles.css

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

## src/app/app.config.ts

```typescript
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ThemeService } from '@piying-lib/angular-daisyui/service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    ThemeService,
  ],
};
```

## src/app/app.routes.ts

```typescript
import { Routes } from '@angular/router';
import { SchemaViewPage } from '@piying-lib/angular-core';
import * as v from 'valibot';

export const routes: Routes = [
  {
    path: 'hello',
    component: SchemaViewPage,
    data: {
      schema: () => v.object({
        l1: v.pipe(v.string()),
      }),
      options: () => ({
        fieldGlobalConfig: FieldGlobalConfig,
      }),
      model: () => ({
        l1: '12345',
      }),
    },
  },
];
```

## angular.json (相关配置)

确保以下配置存在:

```json
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.css",
              "node_modules/daisyui/distFULL/cdn.css"
            ]
          }
        }
      }
    }
  }
}
```
