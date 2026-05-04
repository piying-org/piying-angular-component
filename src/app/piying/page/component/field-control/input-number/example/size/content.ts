import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [actions.inputs.patch({ size: 'xs' })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [actions.inputs.patch({ size: 'sm' })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [actions.inputs.patch({ size: 'md' })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [actions.inputs.patch({ size: 'lg' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
