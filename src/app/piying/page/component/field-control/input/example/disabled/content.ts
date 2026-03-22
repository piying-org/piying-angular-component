import * as v from 'valibot';
import { actions, formConfig, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('input', (actions) => {
        return [];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('input', (actions) => {
        return [];
      }),
      formConfig({ disabled: true }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
