import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
const ItemDefine = v.object({
  v1: v.pipe(v.string(), v.title('v1')),
  v2: v.pipe(v.number(), v.title('v2')),
  v3: v.pipe(v.boolean(), v.title('v3')),
});
export default v.pipe(
  v.tuple([
    v.pipe(
      v.array(ItemDefine),
      safeDefine.setComponent('editable-group', (actions) => {
        return [
          actions.inputs.patch({
            layout: 'column',
            addMode: 1,
            addPosition: 'top',
            minLength: 1,
            initValue: (index: any) => {
              return {
                v1: `${index}`,
                v2: index,
                v3: !!index,
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
