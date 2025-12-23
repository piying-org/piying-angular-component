import * as v from 'valibot';
import { NFCSchema, actions,  setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
export const SelectDefine = v.object({
  native1: v.pipe(
    v.string(),
    setComponent('select'),
    actions.inputs.patch({ options: ['item0', 'item1'] }),
  ),
  custom1: v.pipe(
    v.string(),
    setComponent('picker-ref'),
    actions.inputs.patch({
      changeClose: true,
    }),
    actions.inputs.patch({
      trigger: v.pipe(
        NFCSchema,
        setComponent('button'),
        actions.inputs.patchAsync({
          content: (field) => {
            return computed(() => {
              let pickerValue = field.context['pickerValue']();
              return pickerValue ?? '[empty]';
            });
          },
        }),
      ),
      content: v.pipe(
        v.string(),
        setComponent('option-list'),
        actions.wrappers.set(['local-filter']),
        actions.props.patch({ options: ['item0', 'item1'] }),
      ),
    }),
  ),
});
