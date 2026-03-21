import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('accordion', (actions) => {
        return [
          actions.inputs.patch({
            childTitleFn: (item: any) => `📌 ${item.props()?.['title'] ?? item.keyPath?.slice(-1)[0]}`,
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
