import * as v from 'valibot';
import { actions, formConfig } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [];
      }),
    ),
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [];
      }),
      formConfig({ disabled: true }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
