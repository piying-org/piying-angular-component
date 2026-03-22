import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('editable-badge', (actions) => {
        return [actions.inputs.patch({ size: 'xs' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('editable-badge', (actions) => {
        return [actions.inputs.patch({ size: 'sm' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('editable-badge', (actions) => {
        return [actions.inputs.patch({ size: 'md' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('editable-badge', (actions) => {
        return [actions.inputs.patch({ size: 'lg' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
