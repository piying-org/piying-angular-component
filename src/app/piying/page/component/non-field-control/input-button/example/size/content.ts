import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', size: 'xs' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', size: 'sm' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', size: 'md' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', size: 'lg' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
