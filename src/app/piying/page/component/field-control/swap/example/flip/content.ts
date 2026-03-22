import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.boolean(),
      safeDefine.setComponent('swap', (actions) => {
        return [
          actions.inputs.patch({
            flip: true,
            onContent: '✔️',
            offContent: '❌',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
