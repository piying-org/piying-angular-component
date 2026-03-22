import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('radio', (actions) => {
        return [
          actions.inputs.patch({
            options: [
              { label: '选项 1', value: 1 },
              { label: '选项 2', value: 2 },
              { label: '选项 3', value: 3 },
            ],
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
