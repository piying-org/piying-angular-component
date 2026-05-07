import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('label', (actions) => {
        return [actions.inputs.patch({})];
      }),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          setTimeout(() => {
            field.form.control!.updateValue('value');
          }, 0);
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
