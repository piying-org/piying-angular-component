import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('stat', (actions) => {
        return [
          actions.inputs.patch({
            title: 'Monthly Sales',
            value: '$12,345',
            desc: '+15% from last month',
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('stat', (actions) => {
        return [
          actions.inputs.patch({
            title: 'Active Users',
            value: '3,456',
            desc: '+8% this week',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);