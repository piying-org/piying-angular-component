import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('file-input-button', (actions) => {
        return [actions.inputs.patch({ content: 'Images', accept: 'image/*' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('file-input-button', (actions) => {
        return [actions.inputs.patch({ content: 'Documents', accept: '.pdf,.doc,.docx' })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('file-input-button', (actions) => {
        return [actions.inputs.patch({ content: 'Multiple', accept: '*', multiple: true })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
