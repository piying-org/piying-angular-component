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

export interface RawPluginOptions {
  /**
   * File extensions to check in order of priority if the specified file is missing.
   * If it's a directory, the plugin will look for `dir/index.[ext]`.
   * @defaultValue ["ts", "tsx", "js", "jsx", "mjs", "mts", "module.css", "module.scss", "css", "scss"]
   */
  ext?: string[];

  /**
   * Custom loader for file processing.
   * Overridden by import query suffix (?text, ?base64, etc).
   * @defaultValue "text"
   */
  loader?: 'text' | 'base64' | 'dataurl' | 'file' | 'binary' | 'default';

  /**
   * Map file extensions (without dot) to custom loaders.
   * Example: { md: "text", png: "dataurl" }
   */
  customLoaders?: Record<string, 'text' | 'base64' | 'dataurl' | 'file' | 'binary' | 'default'>;

  /**
   * Plugin name override (for debugging, deduplication, etc.)
   */
  name?: string;

  /**
   * @deprecated Use `customLoaders` instead.
   * Previously used to specify extensions to treat as text.
   *
   * Example replacement:
   * ```ts
   * customLoaders: { "module.scss": "text", "md": "text" }
   * ```
   */
  textExtensions?: string[];
}

const defaultPlugin: Plugin = {
  name: 'raw-code',
  setup(build) {
    let ext = DEFAULT_EXT_ORDER_LIST;
    build.onResolve({ filter: /\?(text|component-name-list)$/ }, (args) => {
      const i = args.path.lastIndexOf('?');
      const filepath = i !== -1 ? args.path.slice(0, i) : args.path;
      const query = i !== -1 ? args.path.slice(i + 1) : undefined;

      return {
        path: filepath,
        namespace: 'raw',
        pluginData: {
          fullPath: path.resolve(args.resolveDir, filepath),
          query,
        },
      };
    });

    build.onLoad({ filter: /.*/, namespace: 'raw' }, (args) => {
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

      const buffer = fs.readFileSync(filePath, { encoding: 'utf-8' });

      const loader = 'text';

      return { contents: buffer, loader: loader as Loader };
    });
  },
};

export default [defaultPlugin];
