import { sync } from 'fast-glob';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { camelCase, constantCase, kebabCase, uniq } from 'es-toolkit';
const OUTPUT_DIR = path.join(process.cwd(), './projects/daisyui/preset-css');
async function main() {
  let searchDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : undefined;
  if (!searchDir) {
    throw new Error('🈳daisyui dir');
  }
  let mdList = sync('**/*.md', { cwd: searchDir });
  let result: { name: string; list: string[] }[] = (await Promise.all(
    mdList.map(async (item) => {
      let filePath = path.join(searchDir, item);
      let data = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
      return matter(data);
    }),
  ).then((list) => {
    return list
      .map((item) => {
        let cList = [];
        if (Object.keys(item.data).length) {
          let classnames = item.data.classnames;
          if (classnames) {
            for (const key in classnames) {
              let list = classnames[key];
              if (Array.isArray(list)) {
                for (const item of list) {
                  cList.push(item.class);
                }
              }
            }
            return { name: camelCase(item.data.title), list: cList };
          }
        }
      })
      .filter(Boolean);
  })) as any;
  await fs.promises.mkdir(path.join(OUTPUT_DIR, `ts`), { recursive: true });
  for (const { name, list } of result) {
    let cName = constantCase(`${name}_PREFIX_LIST`);
    let str = `export const ${cName}=${JSON.stringify(list, undefined, 4)}`;
    await fs.promises.writeFile(path.join(OUTPUT_DIR, `ts/${kebabCase(name)}.ts`), str);
  }
  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, `ts/index.ts`),
    result
      .map((item) => {
        return `export * from './${kebabCase(item.name)}';`;
      })
      .join('\n'),
  );
  // json
  await fs.promises.mkdir(path.join(OUTPUT_DIR, `json`), { recursive: true });
  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, `json/manifest.json`),
    JSON.stringify(result, undefined, 4),
  );
  // css
  await fs.promises.mkdir(path.join(OUTPUT_DIR, `css`), { recursive: true });
  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, `css/style.split.css`),
    result
      .flatMap((item) => {
        return `/* ${item.name} */\n@source inline("{${item.list.join(',')}}");`;
      })
      .join('\n'),
  );
  let cssList = result.flatMap((item) => item.list);
  await fs.promises.writeFile(
    path.join(OUTPUT_DIR, `css/style.css`),
    `@source inline("{${cssList.join(',')}}")`,
  );
}
main();
