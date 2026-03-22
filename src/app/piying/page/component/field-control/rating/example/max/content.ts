import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.number(),
      safeDefine.setComponent('rating', (actions) => {
        return [actions.inputs.patch({ max: 5 })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('rating', (actions) => {
        return [actions.inputs.patch({ max: 10 })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
