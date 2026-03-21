import * as v from 'valibot';
import * as Group from './example';
import { NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
console.log(Group.ButtonBase.content);

export const ButtonDefine = v.object(
  Object.entries(Group).reduce(
    (obj, item) => {
      obj[item[0]] = v.pipe(
        NFCSchema,
        safeDefine.setComponent('code-tabs', (actions) => {
          return [actions.inputs.patch({ define: item[1].define, code: item[1].content })];
        }),
      );
      return obj;
    },
    {} as Record<string, v.BaseSchema<any, any, any>>,
  ),
);
