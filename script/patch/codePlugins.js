"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
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
const defaultPlugin = {
    name: 'raw-code',
    setup(build) {
        let ext = DEFAULT_EXT_ORDER_LIST;
        let baseDir = node_path_1.default.join(build.initialOptions.absWorkingDir, 'src/app/piying/page/component');
        build.onResolve({ filter: /\?(text|title)$/ }, (args) => {
            const i = args.path.lastIndexOf('?');
            const filepath = i !== -1 ? args.path.slice(0, i) : args.path;
            const query = i !== -1 ? args.path.slice(i + 1) : undefined;
            console.log('args', args.resolveDir, filepath);
            console.log('fullPath', node_path_1.default.resolve(args.resolveDir, filepath));
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
                    const buffer = node_fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
                    return { contents: buffer, loader: 'text' };
                }
                else {
                    let relPath = node_path_1.default.relative(baseDir, filePath);
                    let list = relPath.split('\\');
                    return { contents: list[3], loader: 'text' };
                }
            });
        }
    },
};
exports.default = [defaultPlugin];
