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
            options: [
              { label: 'Action 1', icon: { fontIcon: 'save' } },
              { label: 'Action 2', icon: { fontIcon: 'edit' } },
              { label: 'Action 3', icon: { fontIcon: 'delete' } },
            ],
            flower: false,
            autoClose: true,
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 will-change-transform h-50'),
);
