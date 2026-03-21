import type { Loader, Plugin, PluginBuild } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

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
          const buffer = fs.readFileSync(filePath, { encoding: 'utf-8' });
          return { contents: buffer, loader: 'text' };
        } else {
          let relPath = path.relative(baseDir, filePath);
          let list = relPath.split('\\');
          return { contents: list[2], loader: 'text' };
        }
      });
    }
  },
};

export default [defaultPlugin];
