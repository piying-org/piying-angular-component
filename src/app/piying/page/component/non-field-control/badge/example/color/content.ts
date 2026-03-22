import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ color: 'primary', content: 'Primary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ color: 'secondary', content: 'Secondary' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ color: 'accent', content: 'Accent' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ color: 'info', content: 'Info' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ color: 'success', content: 'Success' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ color: 'warning', content: 'Warning' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ color: 'error', content: 'Error' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
