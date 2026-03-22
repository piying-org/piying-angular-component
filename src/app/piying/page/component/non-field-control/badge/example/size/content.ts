import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ size: 'xs', content: 'XS' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ size: 'sm', content: 'SM' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ size: 'md', content: 'MD' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('badge', (actions) => {
        return [actions.inputs.patch({ size: 'lg', content: 'LG' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
