import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [actions.inputs.patch({ imgUrl: 'https://ui-avatars.com/api/?name=John+Doe', wrapperClass: 'w-24' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [actions.inputs.patch({ imgUrl: 'https://ui-avatars.com/api/?name=Jane+Smith', wrapperClass: 'w-32 rounded-full' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
