import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.array(v.pipe(v.string(), setComponent('checkbox'))),
      safeDefine.setComponent('checkbox-list', (actions) => {
        return [
          actions.inputs.patch({
            options: [{ value: 'Option 1' }, { value: 'Option 2' }],
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
