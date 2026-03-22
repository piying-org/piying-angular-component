import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', shape: 'square',  })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', shape: 'wide',  })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', shape: 'circle',  })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);