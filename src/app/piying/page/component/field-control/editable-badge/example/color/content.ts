import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('editable-badge', (actions) => {
        return [actions.inputs.patch({ color: 'primary' })];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('editable-badge', (actions) => {
        return [actions.inputs.patch({ color: 'secondary' })];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('editable-badge', (actions) => {
        return [actions.inputs.patch({ color: 'accent' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
