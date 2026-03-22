import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ color: 'primary', content: 'Primary alert' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ color: 'secondary', content: 'Secondary alert' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ color: 'accent', content: 'Accent alert' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ color: 'info', content: 'Info alert' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ color: 'success', content: 'Success alert' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ color: 'warning', content: 'Warning alert' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('alert', (actions) => {
        return [actions.inputs.patch({ color: 'error', content: 'Error alert' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
