import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ disabled: true, content: 'Disabled' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ disabled: false, content: 'Enabled' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
