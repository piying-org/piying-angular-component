import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';

export default v.pipe(
  v.tuple([
    v.pipe(
      v.union([
        v.pipe(v.object({ l1: v.pipe(v.string(), v.title('l1')) }), v.title('tab1')),
        v.pipe(v.object({ l2: v.pipe(v.string(), v.title('l2')) }), v.title('tab2')),
      ]),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          field.form.control!.valueChanges.subscribe((data) => {
            console.log('change', data);
          });
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
