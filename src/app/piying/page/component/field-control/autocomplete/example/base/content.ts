import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('autocomplete', (actions) => {
        return [
          actions.inputs.patchAsync({
            options: (field) => {
              return [
                { label: 'test1', value: 'value1' },
                { label: 'test2', value: 'value2' },
                { label: 'test3', value: 'value3' },
              ];
            },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
