import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';

export function createCodeExampleObject(
  input: Record<string, { title: string; content: string; define: v.BaseSchema<any, any, any> }>,
) {
  return v.pipe(
    v.object(
      Object.entries(input).reduce(
        (obj, item) => {
          obj[item[0]] = v.pipe(
            v.tuple([
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
            ]),
            actions.wrappers.patch(['div']),
            actions.class.top('grid gap-2'),
          );
          return obj;
        },
        {} as Record<string, v.BaseSchema<any, any, any>>,
      ),
    ),
    actions.wrappers.patch(['div']),
    actions.class.top('grid gap-4 p-4'),
  );
}
