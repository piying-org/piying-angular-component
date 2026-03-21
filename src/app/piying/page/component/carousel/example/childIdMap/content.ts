import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('carousel', (actions) => {
        return [
          actions.inputs.patch({
            childIdMap: (compIndex: number, childIndex: number) => `custom-${compIndex}-${childIndex}`,
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
