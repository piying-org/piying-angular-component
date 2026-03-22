import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('input', (actions) => {
        return [actions.inputs.patch({ type: 'text' })];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('input', (actions) => {
        return [actions.inputs.patch({ type: 'email' })];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('input', (actions) => {
        return [actions.inputs.patch({ type: 'password' })];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('input', (actions) => {
        return [actions.inputs.patch({ type: 'number' })];
      }),
    ),
    v.pipe(
      v.date(),
      safeDefine.setComponent('input', (actions) => {
        return [actions.inputs.patch({ type: 'date' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
