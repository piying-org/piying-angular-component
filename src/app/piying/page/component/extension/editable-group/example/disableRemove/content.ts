import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.array(
        v.object({
          l1: v.pipe(v.string(), v.title('l1-title')),
          l2: v.pipe(v.boolean(), v.title('l2-title')),
        }),
      ),
      safeDefine.setComponent('editable-group', (actions) => {
        return [
          actions.inputs.patch({
            disableRemove: true,
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
