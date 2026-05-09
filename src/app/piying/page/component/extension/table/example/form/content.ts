import * as v from 'valibot';
import { actions, hideWhen, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';

export default v.object({
  table: v.pipe(
    v.array(
      v.object({
        k1: v.pipe(v.string(), v.title('k1-title'), actions.wrappers.set(['td'])),
        k2: v.pipe(v.number(), v.title('k2-title'), actions.wrappers.set(['td'])),
      }),
    ),
    safeDefine.setComponent('table-group', (actions) => {
      return [
        actions.inputs.patch({ zebra: true }),
        actions.class.component('rounded-box border border-base-content/5 bg-base-100'),
      ];
    }),
    actions.hooks.merge({
      allFieldsResolved: (field) => {
        setTimeout(() => {
          field.form.control!.updateValue([
            { k1: '11', k2: 66 },
            { k1: '22', k2: 77 },
          ]);
        }, 0);
      },
    }),
  ),
});
