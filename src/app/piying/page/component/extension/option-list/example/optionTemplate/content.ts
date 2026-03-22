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
            optionTemplate: { content: (item: any) => `📌 ${item.name}` },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
