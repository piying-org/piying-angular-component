import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', style: 'outline',  })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', style: 'dash',  })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', style: 'soft',  })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', style: 'ghost',  })];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('input-button', (actions) => {
        return [actions.inputs.patch({ type: 'submit', style: 'link',  })];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);