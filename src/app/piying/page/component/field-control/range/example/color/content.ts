import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.number(),
      safeDefine.setComponent('range', (actions) => {
        return [actions.inputs.patch({ min: 0, max: 100, color: 'primary' })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('range', (actions) => {
        return [actions.inputs.patch({ min: 0, max: 100, color: 'secondary' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);