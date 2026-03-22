import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [
          actions.inputs.patch({
            style: 'outline',
            color: 'primary',
            size: 'lg',
            content: 'Complete Badge',
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [
          actions.inputs.patch({
            style: 'soft',
            color: 'error',
            size: 'sm',
            content: 'Small Error',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
