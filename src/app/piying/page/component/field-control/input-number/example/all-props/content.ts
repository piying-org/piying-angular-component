import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.number(),
      safeDefine.setComponent('input-number', (actions) => {
        return [
          actions.inputs.patch({
            min: 0,
            max: 100,
            step: 5,
            size: 'lg',
            color: 'primary',
            buttonPosition: 'both',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
