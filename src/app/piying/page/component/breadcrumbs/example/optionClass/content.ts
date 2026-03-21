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
            optionClass: 'text-lg font-bold',
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('breadcrumbs', (actions) => {
        return [
          actions.inputs.patch({
            options: [
              { label: 'Page 1', url: '' },
              { label: 'Page 2', url: '' },
              { label: 'Page 3', url: '' },
            ],
            optionClass: 'text-primary hover:text-accent',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
