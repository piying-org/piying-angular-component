import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ style: 'outline', content: 'Outline alert' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ style: 'dash', content: 'Dash alert' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ style: 'soft', content: 'Soft alert' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
