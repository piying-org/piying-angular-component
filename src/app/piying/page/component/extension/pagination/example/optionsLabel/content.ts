import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('pagination', (actions) => {
        return [
          actions.inputs.patch({
            optionsLabel: (size: number, index: number, count: number) => `${size} 条/页`,
            count: 150,
            value: { index: 0, size: 10 },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
