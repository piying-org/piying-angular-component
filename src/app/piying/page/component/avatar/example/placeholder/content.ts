import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [actions.inputs.patch({ placeholder: 'User', placeholderClass: 'text-primary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [actions.inputs.patch({ placeholder: 'A', wrapperClass: 'w-16' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('avatar', (actions) => {
        return [actions.inputs.patch({ placeholder: 'AB', wrapperClass: 'w-20 rounded-full' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
