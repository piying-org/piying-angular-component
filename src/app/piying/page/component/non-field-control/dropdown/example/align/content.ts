import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('dropdown', (actions) => {
        return [actions.inputs.patch({ title: 'Start', content: 'Content', align: 'start' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('dropdown', (actions) => {
        return [actions.inputs.patch({ title: 'Center', content: 'Content', align: 'center' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('dropdown', (actions) => {
        return [actions.inputs.patch({ title: 'End', content: 'Content', align: 'end' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
