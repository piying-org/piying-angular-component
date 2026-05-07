import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('button-input', (actions) => {
        return [
          actions.inputs.patch({
            shape: 'circle',
            style: 'ghost',
            content: { icon: { fontIcon: 'add' } },
            allowClear: true,
          }),
          actions.inputs.patchAsync({
            clicked: () => {
              let index = 0;
              return () => {
                return `value-${index++}`;
              };
            },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
