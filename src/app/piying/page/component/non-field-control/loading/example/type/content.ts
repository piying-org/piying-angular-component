import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ type: 'spinner' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ type: 'dots' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ type: 'ring' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ type: 'ball' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ type: 'bars' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ type: 'infinity' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap flex-row flex-wrap'),
);
