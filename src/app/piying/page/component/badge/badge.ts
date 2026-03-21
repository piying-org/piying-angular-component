import * as v from 'valibot';
import * as Group from './example';
import { NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';

export const BadgeDefine = v.object(
  Object.entries(Group).reduce(
    (obj, item) => {
      obj[item[0]] = v.tuple([
        v.pipe(
          NFCSchema,
          safeDefine.setComponent('code-header', (actions) => {
            return [actions.inputs.patch({ title: item[1].title })];
          }),
        ),
        v.pipe(
          NFCSchema,
          safeDefine.setComponent('code-tabs', (actions) => {
            return [actions.inputs.patch({ define: item[1].define, code: item[1].content })];
          }),
        ),
      ]);
      return obj;
    },
    {} as Record<string, v.BaseSchema<any, any, any>>,
  ),
);
