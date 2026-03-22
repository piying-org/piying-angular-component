import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 70, color: 'primary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 70, color: 'secondary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 70, color: 'accent' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 70, color: 'success' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 70, color: 'error' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
