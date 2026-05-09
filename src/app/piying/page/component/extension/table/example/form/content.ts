import * as v from 'valibot';
import { actions, FieldArray, hideWhen, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { map } from 'rxjs';

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
        actions.inputs.patch({ zebra: true, range: [0, 2], disableAdd: true }),
        actions.class.component('rounded-box border border-base-content/5 bg-base-100'),
      ];
    }),
    actions.hooks.merge({
      allFieldsResolved: (field) => {
        setTimeout(() => {
          field.form.control!.updateValue([
            { k1: '11', k2: 66 },
            { k1: '22', k2: 77 },
            { k1: '33', k2: 88 },
            { k1: '44', k2: 99 },
          ]);
        }, 0);
      },
    }),
  ),
  page: safeDefine.nfcComponent('pagination', (actions) => {
    return [
      actions.class.top('mt-4 flex justify-end'),
      actions.inputs.patch({
        value: {
          size: 2,
          index: 0,
        },
      }),
      actions.inputs.patchAsync({
        count: (field) => {
          let control = field.get(['..', 'table'])!.form.control! as FieldArray;
          return control.valueChanges.pipe(
            map((list) => {
              return list?.length ?? 0;
            }),
          );
        },
      }),
      actions.outputs.patchAsync({
        valueChange: (field) => {
          return (data) => {
            let control = field.get(['..', 'table'])!;
            let start = data.index * data.size;
            control.inputs.update((inputs) => {
              return {
                ...inputs,
                range: [start, start + data.size],
              };
            });
          };
        },
      }),
    ];
  }),
});
