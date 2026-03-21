import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            color: 'primary',
            style: 'soft',
            size: 'md',
            shape: 'square',
            active: false,
            content: { icon: { fontIcon: 'add' } },
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            color: 'success',
            style: 'outline',
            size: 'lg',
            shape: 'wide',
            content: 'Wide Success Button',
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            color: 'error',
            style: 'dash',
            size: 'sm',
            shape: 'circle',
            content: 'X',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
