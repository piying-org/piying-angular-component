import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('dropdown', (actions) => {
        return [
          actions.inputs.patch({
            title: 'Complete Dropdown',
            content: 'Content with all props',
            align: 'end',
            position: 'top',
            triggerAction: 'hover',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);