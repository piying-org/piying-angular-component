import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('textarea', (actions) => {
        return [actions.inputs.patch({ size: 'sm' })];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('textarea', (actions) => {
        return [actions.inputs.patch({ size: 'md' })];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('textarea', (actions) => {
        return [actions.inputs.patch({ size: 'lg' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
