import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('select', (actions) => {
        return [
          actions.inputs.patch({ options: [{ label: 'Option 1', value: '1' }], color: 'primary' }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('select', (actions) => {
        return [
          actions.inputs.patch({
            options: [{ label: 'Option 2', value: '2' }],
            color: 'secondary',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
