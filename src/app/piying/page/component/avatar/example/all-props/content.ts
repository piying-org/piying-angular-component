import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [
          actions.inputs.patch({
            placeholder: 'User',
            wrapperClass: 'w-28 rounded-full',
            status: 'online',
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [
          actions.inputs.patch({
            imgUrl: 'https://ui-avatars.com/api/?name=Test+User',
            wrapperClass: 'w-20',
            status: 'offline',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
