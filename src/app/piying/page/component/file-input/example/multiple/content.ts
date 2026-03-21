import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('file-input', (actions) => {
        return [actions.inputs.patch({ multiple: false })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('file-input', (actions) => {
        return [actions.inputs.patch({ multiple: true })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
