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
            title: 'Complete Stat',
            titleClass: 'text-xl font-bold',
            value: '99.9%',
            valueClass: 'text-4xl font-bold text-primary',
            desc: 'Success rate this month',
            descClass: 'text-success',
            figure: { icon: { fontIcon: 'stars' } },
            figureClass: 'text-warning',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);