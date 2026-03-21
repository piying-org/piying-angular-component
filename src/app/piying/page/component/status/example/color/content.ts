import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'Primary', color: 'primary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'Secondary', color: 'secondary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'Success', color: 'success' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'Error', color: 'error' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);