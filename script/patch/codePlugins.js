"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const ts = tslib_1.__importStar(require("typescript"));
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
function isRelativeImport(specifier) {
    return specifier.startsWith('.') || specifier.startsWith('..');
}
function resolveImportPath(importSpecifier, importerDir) {
    const resolved = node_path_1.default.resolve(importerDir, importSpecifier);
    if (node_fs_1.default.existsSync(resolved) && node_fs_1.default.lstatSync(resolved).isDirectory()) {
        return null; // 跳过目录导入
    }
    for (const ext of DEFAULT_EXT_ORDER_LIST) {
        const candidate = `${resolved}.${ext}`;
        if (node_fs_1.default.existsSync(candidate)) {
            return candidate;
        }
    }
    return null;
}
function collectImports(filePath, collected) {
    if (collected.has(filePath)) {
        return; // 避免循环引用
    }
    const content = node_fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
    collected.set(filePath, content);
    try {
        const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
        function visit(node) {
            if (ts.isImportDeclaration(node)) {
                const specifier = node.moduleSpecifier;
                if (specifier && ts.isStringLiteral(specifier) && isRelativeImport(specifier.text)) {
                    const resolvedPath = resolveImportPath(specifier.text, node_path_1.default.dirname(filePath));
                    if (resolvedPath && !collected.has(resolvedPath)) {
                        collectImports(resolvedPath, collected);
                    }
                }
            }
            else if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
                const specifier = node.moduleSpecifier;
                if (specifier && ts.isStringLiteral(specifier) && isRelativeImport(specifier.text)) {
                    const resolvedPath = resolveImportPath(specifier.text, node_path_1.default.dirname(filePath));
                    if (resolvedPath && !collected.has(resolvedPath)) {
                        collectImports(resolvedPath, collected);
                    }
                }
            }
            ts.forEachChild(node, visit);
        }
        visit(sourceFile);
    }
    catch (e) {
        // 解析失败时跳过，不影响其他文件
        console.warn(`Failed to parse TypeScript file: ${filePath}`, e);
    }
}
function mergeContents(collected) {
    const parts = [];
    for (const [filePath, content] of collected) {
        parts.unshift(`// ${node_path_1.default.relative(process.cwd(), filePath)}\n${content}`);
    }
    return parts.join(`\n//----------\n`);
}
const defaultPlugin = {
    name: 'raw-code',
    setup(build) {
        let ext = DEFAULT_EXT_ORDER_LIST;
        let baseDir = node_path_1.default.join(build.initialOptions.absWorkingDir, 'src/app/piying/page/component');
        build.onResolve({ filter: /\?(text|title)$/ }, (args) => {
            const i = args.path.lastIndexOf('?');
            const filepath = i !== -1 ? args.path.slice(0, i) : args.path;
            const query = i !== -1 ? args.path.slice(i + 1) : undefined;
            return {
                pluginName: 'raw-code',
                path: node_path_1.default.resolve(args.resolveDir, filepath),
                namespace: `raw-code-${query}`,
                pluginData: {
                    fullPath: node_path_1.default.resolve(args.resolveDir, filepath),
                    query,
                },
            };
        });
        for (const name of ['text', 'title']) {
            build.onLoad({ filter: /.*/, namespace: `raw-code-${name}` }, (args) => {
                const { fullPath, query } = args.pluginData;
                let filePath = fullPath;
                if (node_fs_1.default.existsSync(filePath) && node_fs_1.default.lstatSync(filePath).isDirectory()) {
                    filePath = node_path_1.default.join(filePath, 'index');
                }
                if (!node_fs_1.default.existsSync(filePath)) {
                    const resolved = ext.find((e) => node_fs_1.default.existsSync(`${filePath}.${e}`));
                    if (resolved) {
                        filePath += `.${resolved}`;
                    }
                }
                if (!node_fs_1.default.existsSync(filePath)) {
                    throw new Error(`File not found: ${fullPath}\nChecked extensions: ${ext.join(', ')}.\nYou can customize extensions list using { ext: [...] }.`);
                }
                if (name === 'text') {
                    // 收集当前文件及所有相对路径导入的依赖文件
                    const collected = new Map();
                    collectImports(filePath, collected);
                    const merged = mergeContents(collected);
                    return { contents: merged, loader: 'text' };
                }
                else {
                    let relPath = node_path_1.default.relative(baseDir, filePath);
                    let list = relPath.split(/\\|\//);
                    return { contents: list[3], loader: 'text' };
                }
            });
        }
    },
};
exports.default = [defaultPlugin];
