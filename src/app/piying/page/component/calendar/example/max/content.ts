import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('calendar', (actions) => {
        return [
          actions.inputs.patch({
            dateProps: {
              max: new Date('2024-12-31'),
            },
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('calendar', (actions) => {
        return [
          actions.inputs.patch({
            dateProps: {
              min: new Date('2024-01-01'),
              max: new Date('2024-06-30'),
            },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
