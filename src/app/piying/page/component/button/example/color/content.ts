import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ color: 'neutral' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ color: 'primary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ color: 'secondary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ color: 'accent' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ color: 'info' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ color: 'success' })];
      }),
    ),

    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ color: 'warning' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ color: 'error' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
