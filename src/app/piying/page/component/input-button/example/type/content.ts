import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'reset' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
