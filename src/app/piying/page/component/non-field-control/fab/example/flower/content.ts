import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('fab', (actions) => {
        return [
          actions.inputs.patch({
            defaultIcon: { label: '⭐' },
            flower: true,
            options: [{ label: 'Like' }, { label: 'Share' }, { label: 'Save' }],
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 will-change-transform h-50'),
);
