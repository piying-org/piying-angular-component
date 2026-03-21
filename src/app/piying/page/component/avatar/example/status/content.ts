import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [actions.inputs.patch({ placeholder: 'Online', status: 'online' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [actions.inputs.patch({ placeholder: 'Offline', status: 'offline' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
