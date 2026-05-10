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
            multiple: true,
            options: [
              {
                value: { value: 'option-1' },
                label: 'option-1',
              },
              {
                value: { value: 'option-2' },
                label: 'option-2',
              },
              {
                value: { value: 'option-3' },
                label: 'option-3',
              },
            ],
          }),
        ];
      }),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          setTimeout(() => {
            field.form.control!.updateValue([{ value: 'option-1' }, { value: 'option-2' }]);
          }, 0);
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
