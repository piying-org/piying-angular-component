import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('list-template', (actions) => {
        return [
          actions.inputs.patch({
            template: { type: 'string' },
            list: ['项目 A', '项目 B', '项目 C', '项目 D', '项目 E'],
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
