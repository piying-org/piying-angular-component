import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('kbd', (actions) => {
        return [actions.inputs.patch({ size: 'xs', content: 'Alt' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('kbd', (actions) => {
        return [actions.inputs.patch({ size: 'sm', content: 'Shift' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('kbd', (actions) => {
        return [actions.inputs.patch({ size: 'md', content: 'Tab' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('kbd', (actions) => {
        return [actions.inputs.patch({ size: 'lg', content: 'Enter' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);