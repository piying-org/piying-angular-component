import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('divider', (actions) => {
        return [
          actions.inputs.patch({
            direction: 'horizontal',
            contentPosition: 'start',
            color: 'primary',
            content: 'Complete Divider',
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('divider', (actions) => {
        return [
          actions.inputs.patch({
            direction: 'vertical',
            color: 'accent',
            content: 'Vertical',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
