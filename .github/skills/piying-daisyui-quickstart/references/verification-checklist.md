# 验证检查清单

## 安装完成验证

### package.json 检查

检查 `package.json` 中是否包含以下依赖:

```json
{
  "dependencies": {
    "@piying-lib/angular-daisyui": "^x.x.x",
    "@piying/view-angular": "^2.7.1",
    "@angular/cdk": ">=20.0.0",
    "@angular/material": ">=20.0.0",
    "@cyia/ngx-common": ">=20.0.4"
  },
  "devDependencies": {
    "daisyui": "^5.5.19"
  }
}
```

### 文件存在性检查

- [ ] `angular.json` 存在
- [ ] `package.json` 存在
- [ ] `.postcssrc.json` 存在且配置正确
- [ ] `src/styles.css` 或 `src/styles.scss` 存在
- [ ] `src/app/app.config.ts` 存在
- [ ] `src/app/app.routes.ts` 存在
- [ ] `src/main.ts` 存在

### CSS 配置检查

检查 `src/styles.css` 或 `src/styles.scss` 是否包含:

- [ ] `@import 'tailwindcss';`
- [ ] `@plugin "daisyui" { themes: ... }`
- [ ] `@source '../node_modules/@piying-lib/angular-daisyui/fesm2022';`
- [ ] `@source '../node_modules/@piying-lib/angular-daisyui/preset-css/ts';`

### app.config.ts 检查

检查 `src/app/app.config.ts` 是否包含:

- [ ] `ThemeService` 的导入语句
- [ ] `ThemeService` 添加到 providers 数组

## 编译和运行验证

### 编译检查

运行以下命令:

```bash
npm run build
```

预期结果:

- [ ] 没有 TypeScript 错误
- [ ] 没有编译警告
- [ ] 构建成功

### 运行检查

运行以下命令:

```bash
npm start
```

预期结果:

- [ ] 项目成功启动
- [ ] 没有运行时错误
- [ ] DaisyUI 主题正常加载
- [ ] 应用可以在浏览器中正常访问

## 功能验证

### 基本功能

- [ ] 应用可以正常启动
- [ ] DaisyUI 样式正常应用
- [ ] 主题切换功能正常
- [ ] 没有控制台错误

### 组件验证（可选）

- [ ] 可以成功导入 `SchemaViewPage` 组件
- [ ] 可以正常使用 piying-view 表单
