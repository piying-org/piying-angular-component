import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ direction: 'horizontal', content: 'Horizontal alert with icon' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ direction: 'vertical', content: 'Vertical alert with icon' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
