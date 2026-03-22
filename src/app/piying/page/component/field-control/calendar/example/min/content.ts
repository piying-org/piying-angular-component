import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.date(),
      safeDefine.setComponent('calendar', (actions) => {
        return [
          actions.inputs.patch({
            dateProps: {
              min: new Date('2024-01-01'),
            },
          }),
        ];
      }),
    ),
    v.pipe(
      v.date(),
      safeDefine.setComponent('calendar', (actions) => {
        return [
          actions.inputs.patch({
            dateProps: {
              min: new Date('2023-06-01'),
              max: new Date('2024-12-31'),
            },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
