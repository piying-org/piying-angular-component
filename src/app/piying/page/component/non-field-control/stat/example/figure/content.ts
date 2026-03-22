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
            title: 'Likes',
            value: '1.2K',
            figure: { icon: { fontIcon: 'favorite' } },
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('stat', (actions) => {
        return [
          actions.inputs.patch({
            title: 'Views',
            value: '5.5K',
            figure: { icon: { fontIcon: 'visibility' } },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);