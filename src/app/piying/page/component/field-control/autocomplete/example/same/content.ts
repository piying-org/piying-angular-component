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
              return [{ value: 'value1' }, { value: 'value2' }, { value: 'value3' }];
            },
          }),
        ];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('autocomplete', (actions) => {
        return [
          actions.inputs.patchAsync({
            options: (field) => {
              return [
                { value: 'value1', label: 'value1' },
                { value: 'value2', label: 'value2' },
                { value: 'value3', label: 'value3' },
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
