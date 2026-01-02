import { glob } from 'fast-glob';
import path from 'path';
import fs from 'fs';
import { version } from '../package.json';

if (!version) {
  throw new Error('version not found');
}
async function main() {
  let absDir = path.join(process.cwd(), 'dist');
  let result = await glob('*/package.json', { cwd: absDir });

  await Promise.all([
    result.map(async (item) => {
      let data = JSON.parse(
        await fs.promises.readFile(path.join(absDir, item), {
          encoding: 'utf-8',
        }),
      );
      data['version'] = version;
      if (data?.dependencies?.['@piying-lib/angular-core']) {
        data.dependencies['@piying-lib/angular-core'] = `^${version}`;
      }

      await fs.promises.writeFile(
        path.join(absDir, item),
        JSON.stringify(data, undefined, 4),
      );
    }),
  ]);
  console.log(`©️${version}🔧✅`);
}
main();
