import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('radial-progress', (actions) => {
        return [actions.inputs.patch({ value: 0.25 })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('radial-progress', (actions) => {
        return [actions.inputs.patch({ value: 0.5 })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('radial-progress', (actions) => {
        return [actions.inputs.patch({ value: 0.75 })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('radial-progress', (actions) => {
        return [actions.inputs.patch({ value: 1 })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
