import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('dropdown', (actions) => {
        return [actions.inputs.patch({ title: 'Hover', content: 'Content', triggerAction: 'hover' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('dropdown', (actions) => {
        return [actions.inputs.patch({ title: 'Open', content: 'Content', triggerAction: 'open' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);