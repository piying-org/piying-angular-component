import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('stat', (actions) => {
        return [
          actions.inputs.patch({
            value: v.pipe(
              NFCSchema,
              safeDefine.setComponent('common-data', (actions) => {
                return [actions.inputs.patch({ content: '12K' })];
              }),
            ),
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
