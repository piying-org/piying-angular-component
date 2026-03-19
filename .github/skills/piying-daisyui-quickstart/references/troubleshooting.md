# 故障排除参考

## 问题 1: 对等依赖版本冲突

### 症状

安装时出现以下错误或警告:

```
Peer dependencies warnings or errors
```

### 可能原因

- Angular 版本与对等依赖版本不兼容
- npm 版本过高导致对等依赖检查更严格

### 解决方法

#### 方法 1: 使用 --legacy-peer-deps

```bash
npm i @piying-lib/angular-daisyui --legacy-peer-deps
npm i @piying/view-angular@^2.7.1 --legacy-peer-deps
npm i @angular/cdk@>=20.0.0 --legacy-peer-deps
npm i @angular/material@>=20.0.0 --legacy-peer-deps
npm i @cyia/ngx-common@>=20.0.4 --legacy-peer-deps
```

#### 方法 2: 使用 --force

```bash
npm i @piying-lib/angular-daisyui --force
```

#### 方法 3: 手动指定兼容版本

检查 Angular 版本:

```bash
ng version
```

然后安装对应的对等依赖版本:

```bash
npm i @angular/cdk@<your-angular-version>
npm i @angular/material@<your-angular-version>
```

---

## 问题 2: Tailwind CSS 配置错误

### 症状

启动时出现以下错误:

```
PostCSS plugin tailwindcss requires PostCSS 8
```

或

```
tailwindcss is not a PostCSS plugin
```

### 可能原因

- PostCSS 版本不兼容
- `.postcssrc.json` 配置错误

### 解决方法

#### 方法 1: 重新安装 Tailwind CSS

```bash
npm uninstall tailwindcss @tailwindcss/postcss postcss
npm install tailwindcss @tailwindcss/postcss postcss --force
```

#### 方法 2: 检查 .postcssrc.json

确保 `.postcssrc.json` 内容正确:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

---

## 问题 3: DaisyUI 主题未加载

### 症状

应用运行但 DaisyUI 样式未生效

### 可能原因

- CSS 配置中的 `@source` 路径不正确
- DaisyUI 未正确安装

### 解决方法

#### 方法 1: 检查 CSS 配置

确保 `src/styles.css` 或 `src/styles.scss` 中的配置正确:

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

#### 方法 2: 检查 DaisyUI 安装

```bash
npm list daisyui
```

如果未安装:

```bash
npm i -D daisyui@latest
```

---

## 问题 4: ThemeService 未找到

### 症状

编译时出现以下错误:

```
Cannot find module '@piying-lib/angular-daisyui/service'
```

### 可能原因

- 包未正确安装
- TypeScript 路径配置错误

### 解决方法

#### 方法 1: 重新安装包

```bash
npm i @piying-lib/angular-daisyui
```

#### 方法 2: 检查导入路径

确保导入路径正确:

```typescript
import { ThemeService } from '@piying-lib/angular-daisyui/service';
```

---

## 问题 5: 编译错误

### 症状

编译时出现 TypeScript 错误

### 可能原因

- TypeScript 版本不兼容
- 项目配置错误

### 解决方法

#### 方法 1: 检查 TypeScript 版本

```bash
npx tsc --version
```

确保 TypeScript 版本与 Angular 版本兼容。

#### 方法 2: 清理并重新构建

```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## 通用排查步骤

1. **检查版本兼容性**
   - Angular 版本
   - TypeScript 版本
   - 对等依赖版本

2. **清理并重新安装**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **检查配置文件**
   - `.postcssrc.json`
   - `angular.json`
   - `src/styles.css`
   - `src/app/app.config.ts`

4. **查看控制台错误**
   - 打开浏览器开发者工具
   - 检查控制台错误信息

5. **参考文档**
   - [Angular 官方文档](https://angular.io/docs)
   - [Tailwind CSS 文档](https://tailwindcss.com/docs)
   - [DaisyUI 文档](https://daisyui.com/docs)
   - [@piying-lib/angular-daisyui 文档](README.zh-hans.md)
