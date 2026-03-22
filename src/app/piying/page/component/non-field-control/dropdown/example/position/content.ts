import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('dropdown', (actions) => {
        return [actions.inputs.patch({ title: 'Top', content: 'Content', position: 'top' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('dropdown', (actions) => {
        return [actions.inputs.patch({ title: 'Bottom', content: 'Content', position: 'bottom' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
