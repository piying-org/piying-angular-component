import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ size: 'xs', type: 'spinner' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ size: 'sm', type: 'spinner' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ size: 'md', type: 'spinner' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('loading', (actions) => {
        return [actions.inputs.patch({ size: 'lg', type: 'spinner' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
