import type { Loader, Plugin, PluginBuild } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

const DEFAULT_EXT_ORDER_LIST = [
  'ts',
  'tsx',
  'js',
  'jsx',
  'mjs',
  'mts',
  'module.css',
  'module.scss',
  'css',
  'scss',
];

const EXTENSIONS = new Set(DEFAULT_EXT_ORDER_LIST.map((e) => e.split('.')[0]));

function isRelativeImport(specifier: string): boolean {
  return specifier.startsWith('.') || specifier.startsWith('..');
}

function resolveImportPath(importSpecifier: string, importerDir: string): string | null {
  const resolved = path.resolve(importerDir, importSpecifier);
  if (fs.existsSync(resolved) && fs.lstatSync(resolved).isDirectory()) {
    return null; // 跳过目录导入
  }
  for (const ext of DEFAULT_EXT_ORDER_LIST) {
    const candidate = `${resolved}.${ext}`;
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function collectImports(filePath: string, collected: Map<string, string>): void {
  if (collected.has(filePath)) {
    return; // 避免循环引用
  }
  const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
  collected.set(filePath, content);

  try {
    const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

    function visit(node: ts.Node): void {
      if (ts.isImportDeclaration(node)) {
        const specifier = node.moduleSpecifier;
        if (specifier && ts.isStringLiteral(specifier) && isRelativeImport(specifier.text)) {
          const resolvedPath = resolveImportPath(specifier.text, path.dirname(filePath));
          if (resolvedPath && !collected.has(resolvedPath)) {
            collectImports(resolvedPath, collected);
          }
        }
      } else if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
        const specifier = node.moduleSpecifier;
        if (specifier && ts.isStringLiteral(specifier) && isRelativeImport(specifier.text)) {
          const resolvedPath = resolveImportPath(specifier.text, path.dirname(filePath));
          if (resolvedPath && !collected.has(resolvedPath)) {
            collectImports(resolvedPath, collected);
          }
        }
      }
      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
  } catch (e) {
    // 解析失败时跳过，不影响其他文件
    console.warn(`Failed to parse TypeScript file: ${filePath}`, e);
  }
}

function mergeContents(collected: Map<string, string>): string {
  const parts: string[] = [];
  for (const [filePath, content] of collected) {
    parts.unshift(`// ${path.relative(process.cwd(), filePath)}\n${content}`);
  }
  return parts.join(`\n//----------\n`);
}

const defaultPlugin: Plugin = {
  name: 'raw-code',
  setup(build) {
    let ext = DEFAULT_EXT_ORDER_LIST;
    let baseDir = path.join(build.initialOptions.absWorkingDir!, 'src/app/piying/page/component');
    build.onResolve({ filter: /\?(text|title)$/ }, (args) => {
      const i = args.path.lastIndexOf('?');
      const filepath = i !== -1 ? args.path.slice(0, i) : args.path;
      const query = i !== -1 ? args.path.slice(i + 1) : undefined;

      return {
        pluginName: 'raw-code',
        path: path.resolve(args.resolveDir, filepath),
        namespace: `raw-code-${query}`,
        pluginData: {
          fullPath: path.resolve(args.resolveDir, filepath),
          query,
        },
      };
    });
    for (const name of ['text', 'title']) {
      build.onLoad({ filter: /.*/, namespace: `raw-code-${name}` }, (args) => {
        const { fullPath, query } = args.pluginData;
        let filePath = fullPath;
        if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
          filePath = path.join(filePath, 'index');
        }
        if (!fs.existsSync(filePath)) {
          const resolved = ext.find((e) => fs.existsSync(`${filePath}.${e}`));
          if (resolved) {
            filePath += `.${resolved}`;
          }
        }
        if (!fs.existsSync(filePath)) {
          throw new Error(
            `File not found: ${fullPath}\nChecked extensions: ${ext.join(', ')}.\nYou can customize extensions list using { ext: [...] }.`,
          );
        }
        if (name === 'text') {
          // 收集当前文件及所有相对路径导入的依赖文件
          const collected = new Map<string, string>();
          collectImports(filePath, collected);
          const merged = mergeContents(collected);
          return { contents: merged, loader: 'text' };
        } else {
          let relPath = path.relative(baseDir, filePath);
          let list = relPath.split(/\\|\//);
          return { contents: list[3], loader: 'text' };
        }
      });
    }
  },
};

export default [defaultPlugin];
