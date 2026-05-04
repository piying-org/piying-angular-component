import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [actions.inputs.patch({ color: 'primary' })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [actions.inputs.patch({ color: 'secondary' })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [actions.inputs.patch({ color: 'accent' })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [actions.inputs.patch({ color: 'neutral' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
