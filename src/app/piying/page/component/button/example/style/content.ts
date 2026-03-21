import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ style: 'outline', content: 'Outline' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ style: 'dash', content: 'Dash' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ style: 'soft', content: 'Soft' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ style: 'ghost', content: 'Ghost' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [actions.inputs.patch({ style: 'link', content: 'Link' })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
