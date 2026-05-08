import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';

export default v.pipe(
  v.tuple([
    v.pipe(
      v.array(
        v.pipe(
          v.string(),
          safeDefine.setComponent('editable-badge', (actions) => {
            return [];
          }),
        ),
      ),
      safeDefine.setComponent('editable-group', (actions) => {
        return [
          actions.inputs.patch({
            layout: 'row',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
