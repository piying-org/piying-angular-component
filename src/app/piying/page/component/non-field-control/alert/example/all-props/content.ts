import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [
          actions.inputs.patch({
            style: 'outline',
            color: 'primary',
            direction: 'horizontal',
            content: 'Complete alert with all props',
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [
          actions.inputs.patch({
            style: 'soft',
            color: 'error',
            direction: 'vertical',
            content: 'Vertical error alert with soft style',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
