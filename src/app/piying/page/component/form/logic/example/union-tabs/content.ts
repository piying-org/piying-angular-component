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
      v.union([
        v.pipe(v.object({ l1: v.pipe(v.string(), v.title('l1')) }), v.title('tab1')),
        v.pipe(v.object({ l2: v.pipe(v.string(), v.title('l2')) }), v.title('tab2')),
      ]),
      safeDefine.setComponent('tabs', (actions) => {
        return [
          actions.inputs.patch({
            activatedIndex: 1,
          }),
          actions.hooks.merge({
            allFieldsResolved: (field) => {
              field.form.control!.valueChanges.subscribe((data) => {
                console.log('change', data);
              });
            },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
