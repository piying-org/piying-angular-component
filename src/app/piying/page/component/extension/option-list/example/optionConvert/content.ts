import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('option-list', (actions) => {
        return [
          actions.inputs.patch({
            options: [
              { id: 1, name: '选项 1' },
              { id: 2, name: '选项 2' },
            ],
            optionConvert: {
              label: (item: any) => item.name,
              value: (item: any) => item.id,
            },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
