import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('autocomplete', (actions) => {
        return [
          actions.inputs.patch({ type: 'color', allowCustom: true }),
          actions.inputs.patchAsync({
            options: (field) => {
              return [{ value: '#ffffff' }, { value: '#000000' }, { value: '#ff0000' }];
            },
          }),
          // actions.hooks.merge({
          //   allFieldsResolved: (field) => {
          //     field.form.control!.valueChanges.subscribe((value) => {
          //       console.log('change', value);
          //     });
          //   },
          // }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
