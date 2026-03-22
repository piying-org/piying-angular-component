import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 25, max: 100 })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 50, max: 100 })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 75, max: 100 })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('progress', (actions) => {
        return [actions.inputs.patch({ value: 100, max: 100 })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
