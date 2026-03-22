import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('radial-progress', (actions) => {
        return [actions.inputs.patch({ value: .75, strokeWidth: '4px' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('radial-progress', (actions) => {
        return [actions.inputs.patch({ value: .75, strokeWidth: '8px' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);