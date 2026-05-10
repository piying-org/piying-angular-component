import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('select', (actions) => {
        return [
          actions.inputs.patch({
            multiple: true,
            options: ['option 1', 'option 2', 'option 3'],
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
