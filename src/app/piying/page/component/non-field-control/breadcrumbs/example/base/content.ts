import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('breadcrumbs', (actions) => {
        return [
          actions.inputs.patch({
            options: [
              { label: 'Home', url: '' },
              { label: 'About', url: '' },
              { label: 'Contact', url: '' },
            ],
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
