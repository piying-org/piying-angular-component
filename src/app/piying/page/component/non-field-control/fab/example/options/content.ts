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
            defaultIcon: { label: 'Menu' },
            options: [{ label: 'Add' }, { label: 'Edit' }, { label: 'Delete' }],
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('fab', (actions) => {
        return [
          actions.inputs.patch({
            defaultIcon: { label: 'Actions' },
            options: [
              { label: 'Save', icon: { fontIcon: 'save' } },
              { label: 'Cancel', icon: { fontIcon: 'close' } },
            ],
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
