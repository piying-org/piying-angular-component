import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'XS', size: 'xs' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'SM', size: 'sm' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'MD', size: 'md' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('status', (actions) => {
        return [actions.inputs.patch({ content: 'LG', size: 'lg' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
