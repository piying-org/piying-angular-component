import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'Ping', animatePing: true })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'Bounce', animateBounce: true })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);